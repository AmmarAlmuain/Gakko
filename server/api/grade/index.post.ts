import { supabase } from "~/server/database";
import { VGrade } from "./lib/grade.validation";
import { createGrade } from "./lib/grade.logic";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationResult = VGrade.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "GRADE",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createGrade(body, supabase);
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
