import { supabase } from "~/server/database";
import { student } from "./lib/student.data";
import { createStudent } from "./lib/student.logic";
import { VStudent } from "./lib/student.validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationResult = VStudent.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "STUDENT",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createStudent(body, supabase);
    setResponseStatus(event, 201);
    return {
      property: "SUCCESS",
      data: result,
    };
  } catch (error) {
    console.error(error);
    setResponseStatus(event, 500);
    return {
      property: "CATCH",
      message: "somethun went wrong!",
    };
  }
});
