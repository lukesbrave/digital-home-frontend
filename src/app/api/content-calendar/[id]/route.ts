/**
 * GET /api/content-calendar/[id] — Single calendar entry
 * PATCH /api/content-calendar/[id] — Update status, notes, link content object
 * DELETE /api/content-calendar/[id] — Soft delete (set status to archived)
 */

import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { authenticateRequest, unauthorizedResponse } from "@/lib/api/auth";
import {
  jsonResponse,
  errorResponse,
  notFoundResponse,
} from "@/lib/api/response";
import type { Enums } from "@/types/database";

type RouteContext = { params: Promise<{ id: string }> };

// Valid status transitions — can only move forward (or to archived from any state)
const VALID_TRANSITIONS: Record<string, string[]> = {
  planned: ["approved", "archived"],
  approved: ["writing", "archived"],
  writing: ["draft", "published", "approved", "archived"], // can revert to approved on failure
  draft: ["published", "archived"],
  published: ["archived"],
  archived: [], // terminal state
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(_request);
  if (!auth.authenticated) return unauthorizedResponse(auth.error);

  const { id } = await context.params;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("content_calendar")
    .select("*, content_objects(*), seo_meta(*)")
    .eq("id", id)
    .single();

  if (error || !data) return notFoundResponse("Calendar entry");

  return jsonResponse(data);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(request);
  if (!auth.authenticated) return unauthorizedResponse(auth.error);

  const { id } = await context.params;
  const body = await request.json();

  const supabase = createAdminClient();

  // If status is being changed, validate the transition
  if (body.status) {
    const { data: current } = await supabase
      .from("content_calendar")
      .select("status")
      .eq("id", id)
      .single();

    if (!current) return notFoundResponse("Calendar entry");

    const currentStatus = current.status as string;
    const newStatus = body.status as string;
    const allowed = VALID_TRANSITIONS[currentStatus] || [];

    if (!allowed.includes(newStatus)) {
      return errorResponse(
        `Cannot transition from '${currentStatus}' to '${newStatus}'. Allowed: ${allowed.join(", ") || "none"}`,
        422
      );
    }
  }

  // Build the update object — only include provided fields
  const update: Record<string, unknown> = {};
  const allowedFields = [
    "title",
    "search_query",
    "target_keyword",
    "keyword_cluster",
    "intent_type",
    "priority",
    "status",
    "pillar_topic",
    "topic_cluster",
    "scheduled_publish_date",
    "content_object_id",
    "seo_meta_id",
    "run_id",
    "notes",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      update[field] = body[field];
    }
  }

  // Validate: content_object_id requires status >= draft
  if (update.content_object_id && !["draft", "published"].includes((update.status || body.status || "") as string)) {
    // Check current status if not being updated
    if (!update.status) {
      const { data: current } = await supabase
        .from("content_calendar")
        .select("status")
        .eq("id", id)
        .single();

      if (current && !["draft", "published", "writing"].includes(current.status ?? '')) {
        return errorResponse(
          "content_object_id can only be set when status is writing, draft, or published",
          422
        );
      }
    }
  }

  const { data, error } = await supabase
    .from("content_calendar")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return errorResponse(error.message, 500);
  if (!data) return notFoundResponse("Calendar entry");

  return jsonResponse(data);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(request);
  if (!auth.authenticated) return unauthorizedResponse(auth.error);

  const { id } = await context.params;

  const supabase = createAdminClient();

  // Soft delete — archive instead of removing
  const { data, error } = await supabase
    .from("content_calendar")
    .update({ status: "archived" as Enums<"calendar_status"> })
    .eq("id", id)
    .select()
    .single();

  if (error) return errorResponse(error.message, 500);
  if (!data) return notFoundResponse("Calendar entry");

  return jsonResponse(data);
}
