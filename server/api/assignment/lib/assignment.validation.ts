import { z } from "zod";

export const VAssignment = z.object({
  name: z.string().min(2).max(15),
  description: z.string().max(255),
  dueDate: z.string().min(2).max(15),
  courseId: z.string().max(50),
});

export const VPAssignment = z.object({
  name: z.string().min(2).max(15).optional(),
  description: z.string().max(255).optional(),
  dueDate: z.string().min(2).max(15).optional(),
});

export type TAssignment = z.infer<typeof VAssignment>;
