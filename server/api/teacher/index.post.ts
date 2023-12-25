import { supabase } from "~/server/database";
import { createTeacher } from "./lib/teacher.logic";
import { VTeacher } from "./lib/teacher.validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationResult = VTeacher.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "TEACHER",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createTeacher(body, supabase);
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
