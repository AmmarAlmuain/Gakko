import { z } from "zod";

export const VAttendance = z.object({
  studentId: z.string().max(50),
  date: z.string().max(50).min(4),
  status: z.enum(["Present", "Absent", "Excused", "Late"]),
});

export const VPAttendance = z.object({
  studentId: z.string().max(50).optional(),
  date: z.string().optional(),
  status: z.enum(["Present", "Absent", "Excused", "Late"]).optional(),
});

export type TAttendance = z.infer<typeof VAttendance>;
