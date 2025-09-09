import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  description: z.string().nullable().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
