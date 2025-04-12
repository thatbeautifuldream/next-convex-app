import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
    return tasks;
  },
});

export const setTaskCompleted = mutation({
  args: { taskId: v.id("tasks"), completed: v.boolean() },
  handler: async (ctx, { taskId, completed }) => {
    // Update the database using TypeScript
    await ctx.db.patch(taskId, { completed });
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, { title, description, dueDate }) => {
    await ctx.db.insert("tasks", {
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    });
  },
});
