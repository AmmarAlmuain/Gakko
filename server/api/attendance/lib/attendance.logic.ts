import { supabase } from "~/server/database";
import { TAttendance } from "./attendance.validation";
import { SupabaseClient } from "@supabase/supabase-js";

export const createAttendance = async (
  attendance: TAttendance,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Attendances")
      .insert(attendance)
      .select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAttendance = async (
  attendanceId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Attendances")
      .select("*")
      .eq("id", attendanceId);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putAttendance = async (
  attendanceId: string,
  supabase: SupabaseClient,
  attendance: any
) => {
  try {
    const { data, error } = await supabase
      .from("Attendances")
      .update(attendance)
      .eq("id", attendanceId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAttendance = async (
  attendanceId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Attendances")
      .delete()
      .eq("id", attendanceId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
