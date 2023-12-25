import { z } from "zod";

export const VCourse = z.object({
  name: z.string().min(2).max(15),
  description: z.string().min(2).max(255),
  teacherId: z.string().max(50),
  gradeLevelId: z.enum(["Grade 10", "Grade 11", "Grade 12"]),
});

export const VPCourse = z.object({
  name: z.string().min(2).max(15).optional(),
  description: z.string().min(2).max(255).optional(),
  gradeLevelId: z.enum(["Grade 10", "Grade 11", "Grade 12"]).optional(),
});

export type TCourse = z.infer<typeof VCourse>;
