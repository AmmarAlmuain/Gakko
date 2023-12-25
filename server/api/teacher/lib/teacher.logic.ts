import { SupabaseClient } from "@supabase/supabase-js";
import { TTeacher } from "./teacher.validation";

export const createTeacher = async (
  teacher: TTeacher,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .insert(teacher)
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

export const getTeacher = async (
  teacherId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .select("*")
      .eq("id", teacherId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putTeacher = async (
  teacherId: string,
  supabase: SupabaseClient,
  teacher: TTeacher
) => {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .update(teacher)
      .eq("id", teacherId)
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

export const deleteTeacher = async (
  teacherId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .delete()
      .eq("id", teacherId)
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
