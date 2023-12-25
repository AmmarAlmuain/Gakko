import { supabase } from "~/server/database";
import { putTeacher } from "./lib/teacher.logic";
import { VPTeacher } from "./lib/teacher.validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "TEACHER",
      message: "Teacher not found!",
    };
  }
  const validationResult = VPTeacher.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "TEACHER",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await putTeacher(id, supabase, body);
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
