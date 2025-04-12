import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    completed: v.boolean(),
    title: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_completed", ["completed"]),
});
