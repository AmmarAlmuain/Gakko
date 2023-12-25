import { SupabaseClient } from "@supabase/supabase-js";
import { TGrade } from "./grade.validation";

export const createGrade = async (grade: TGrade, supabase: SupabaseClient) => {
  try {
    const { data, error } = await supabase
      .from("Grades")
      .insert(grade)
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

export const getGrade = async (gradeId: string, supabase: SupabaseClient) => {
  try {
    const { data, error } = await supabase
      .from("Grades")
      .select("*")
      .eq("id", gradeId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putGrade = async (
  gradeId: string,
  supabase: SupabaseClient,
  grade: TGrade
) => {
  try {
    const { data, error } = await supabase
      .from("Grades")
      .update(grade)
      .eq("id", gradeId)
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

export const deleteGrade = async (
  gradeId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Grades")
      .delete()
      .eq("id", gradeId)
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
