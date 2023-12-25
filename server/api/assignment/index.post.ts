import { supabase } from "~/server/database";
import { VAssignment } from "./lib/assignment.validation";
import { createAssignment } from "./lib/assignment.logic";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationResult = VAssignment.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "ASSIGNMENT",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createAssignment(body, supabase);
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
