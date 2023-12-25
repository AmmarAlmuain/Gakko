import { randomUUID } from "crypto";
import { TTeacher } from "./teacher.validation";

export const falsyTeachers: TTeacher[] = [
  {
    name: "Y",
    email: "yoko.tanaka@example.com",
    phoneNumber: "0987654321",
    subject: "Mathematics",
  },
  {
    name: "Yoko Tanaka",
    email: "yoko.tanaka@.com",
    phoneNumber: "0987654321",
    subject: "Mathematics",
  },
  {
    name: "Yoko Tanaka",
    email: "yoko.tanaka@example.com",
    phoneNumber: "098",
    subject: "Mathematics",
  },
  {
    name: "Yoko Tanaka",
    email: "yoko.tanaka@example.com",
    phoneNumber: "0987654321",
    subject: "M",
  },
];

export const teacher: TTeacher = {
  name: "Yoko Tanaka",
  email: "yoko.tanaka@example.com",
  phoneNumber: "0987654321",
  subject: "Mathematics",
};

export const updatedTeacher: TTeacher = {
  name: "Yoko Tanaka",
  email: "yoko.tanaka@example.com",
  phoneNumber: "0987654321",
  subject: "Sport",
};

export const falsyTeacherId: string = randomUUID();
