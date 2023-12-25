import { supabase } from "~/server/database";
import { deleteTeacher } from "./lib/teacher.logic";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "TEACHER",
      message: "Teacher not found!",
    };
  }
  try {
    const result = await deleteTeacher(id, supabase);
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
