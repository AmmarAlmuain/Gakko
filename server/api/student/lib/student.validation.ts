import { z } from "zod";

export const VStudent = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email().max(255),
  phoneNumber: z.string().min(5).max(15),
  gradeLevelId: z.enum(["Grade 10", "Grade 11", "Grade 12"]),
});

export const VPStudent = z.object({
  name: z.string().min(2).max(15).optional(),
  email: z.string().email().max(255).optional(),
  phoneNumber: z.string().min(5).max(15).optional(),
  gradeLevelId: z.enum(["Grade 10", "Grade 11", "Grade 12"]).optional(),
});

export type TStudent = z.infer<typeof VStudent>;
