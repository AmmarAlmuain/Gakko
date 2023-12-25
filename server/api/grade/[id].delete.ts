import { supabase } from "~/server/database";
import { deleteGrade } from "./lib/grade.logic";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "GRADE",
      message: "Grade not found!",
    };
  }
  try {
    const result = await deleteGrade(id, supabase);
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
