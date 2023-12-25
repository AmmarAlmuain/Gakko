import { v4 as uuidv4 } from "uuid";
import { TAttendance } from "./attendance.validation";

const uuid = String(uuidv4());

export const falsyAttendances: TAttendance[] | any = [
  {
    studentId: `${"1234-".repeat(25)}`,
    date: "2023-12-10",
    status: "Late",
  },
  {
    studentId: uuid,
    date: "20",
    status: "Late",
  },
  {
    studentId: uuid,
    date: "2023-12-10",
    status: "L",
  },
];

export const attendance: TAttendance = {
  studentId: uuid,
  date: "2023-12-10",
  status: "Late",
};

export const updatedAttendance = {
  studentId: uuid,
  date: "2023-12-10",
  status: "Excused",
};

export const falsyAttendanceId = uuidv4();
