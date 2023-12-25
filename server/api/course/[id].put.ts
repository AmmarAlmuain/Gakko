import { supabase } from "~/server/database";
import { putCourse } from "./lib/course.logic";
import { VPCourse } from "./lib/course.validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "COURSE",
      message: "Course not found!",
    };
  }
  const validationCourse = VPCourse.safeParse(body);
  if (!validationCourse["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "COURSE",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await putCourse(id, body, supabase);
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
      message: "Somethun went wrong!",
    };
  }
});
