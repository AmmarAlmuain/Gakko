import { z } from "zod";

export const VTeacher = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email().max(255),
  phoneNumber: z.string().min(5).max(15),
  subject: z.string().min(5).max(15),
});

export const VPTeacher = z.object({
  name: z.string().min(2).max(15).optional(),
  email: z.string().email().max(255).optional(),
  phoneNumber: z.string().min(5).max(15).optional(),
  subject: z.string().min(5).max(15).optional(),
});

export type TTeacher = z.infer<typeof VTeacher>;
