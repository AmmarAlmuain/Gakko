import { z } from "zod";

export const VGrade = z.object({
  studentId: z.string().max(50),
  assignmentId: z.string().max(50),
  score: z.number().min(0).max(100),
});

export const VPGrade = z.object({
  score: z.number().min(0).max(100).optional(),
});

export type TGrade = z.infer<typeof VGrade>;
