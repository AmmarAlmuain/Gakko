import { supabase } from "~/server/database";
import { createAttendance } from "./lib/attendance.logic";
import { VAttendance } from "./lib/attendance.validation";
import { error } from "console";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validationResult = VAttendance.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "ATTENDANCE",
      message: "Invalid request body!",
    };
  }
  try {
    const result = await createAttendance(body, supabase);
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
