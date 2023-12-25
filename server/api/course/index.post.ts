import { supabase } from "~/server/database";
import { createCourse } from "./lib/course.logic";
import { VCourse } from "./lib/course.validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationCourse = VCourse.safeParse(body);
  if (!validationCourse["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "COURSE",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createCourse(body, supabase);
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
      message: "Somethun went wrong!",
    };
  }
});
