import { SupabaseClient } from "@supabase/supabase-js";
import { TStudent } from "./student.validation";

export const createStudent = async (
  student: TStudent,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Students")
      .insert(student)
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

export const getStudent = async (
  studentId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Students")
      .select("*")
      .eq("id", studentId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putStudent = async (
  studentId: string,
  supabase: SupabaseClient,
  student: TStudent
) => {
  try {
    const { data, error } = await supabase
      .from("Students")
      .update(student)
      .eq("id", studentId)
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

export const deleteStudent = async (
  studentId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Students")
      .delete()
      .eq("id", studentId)
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
