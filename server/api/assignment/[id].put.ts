import { supabase } from "~/server/database";
import { putAssignment } from "./lib/assignment.logic";
import { VPAssignment } from "./lib/assignment.validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "ASSIGNMENT",
      message: "Assignment not found!",
    };
  }
  const validationResult = VPAssignment.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "ASSIGNMENT",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await putAssignment(id, supabase, body);
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
