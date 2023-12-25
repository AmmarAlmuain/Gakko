import { supabase } from "~/server/database";
import { VPGrade } from "./lib/grade.validation";
import { putGrade } from "./lib/grade.logic";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "GRADE",
      message: "Grade not found!",
    };
  }
  const validationResult = VPGrade.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "GRADE",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await putGrade(id, supabase, body);
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
