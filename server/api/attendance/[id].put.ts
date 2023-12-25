import { supabase } from "~/server/database";
import { putAttendance } from "./lib/attendance.logic";
import { VPAttendance } from "./lib/attendance.validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 404);
    return {
      property: "ATTENDANCE",
      message: "Attendance not found!",
    };
  }
  const validationResult = VPAttendance.safeParse(body);
  if (!validationResult["success"]) {
    setResponseStatus(event, 400);
    return {
      property: "ATTENDANCE",
      message: "Attendance request body!",
    };
  }
  try {
    const result = await putAttendance(id, supabase, body);
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
