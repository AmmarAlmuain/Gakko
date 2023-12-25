import { supabase } from "~/server/database";
import { putStudent } from "./lib/student.logic";
import { VPStudent } from "./lib/student.validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "STUDENT",
      message: "Student not found!",
    };
  }
  const validationResult = VPStudent.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "STUDENT",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await putStudent(id, supabase, body);
    setResponseStatus(event, 200);
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
