import { randomUUID } from "crypto";
import { TStudent } from "./student.validation";

export const falsyStudents = [
  {
    name: "T",
    email: "taro.yamada@example.com",
    phoneNumber: "0123456789",
    gradeLevelId: "Grade 10",
  },
  {
    name: "Taro Yamada",
    email: "taro.yamada@.com",
    phoneNumber: "0123456789",
    gradeLevelId: "Grade 10",
  },
  {
    name: "Taro Yamada",
    email: "taro.yamada@example.com",
    phoneNumber: "012",
    gradeLevelId: "Grade 10",
  },
  {
    name: "Taro Yamada",
    email: "taro.yamada@example.com",
    phoneNumber: "0123456789",
    gradeLevelId: "10",
  },
];

export const student: TStudent = {
  name: "Taro Yamada",
  email: "taro.yamada@example.com",
  phoneNumber: "0123456789",
  gradeLevelId: "Grade 10",
};

export const updatedStudent: TStudent = {
  name: "Taro Yamada",
  email: "taro.yamada@example.com",
  phoneNumber: "0123456789",
  gradeLevelId: "Grade 11",
};

export const falsyStudentId: string = randomUUID();
