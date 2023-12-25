import { SupabaseClient } from "@supabase/supabase-js";
import { TCourse } from "./course.validation";

export const createCourse = async (
  course: TCourse,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Courses")
      .insert(course)
      .select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCourse = async (courseId: string, supabase: SupabaseClient) => {
  try {
    const { data, error } = await supabase
      .from("Courses")
      .select("*")
      .eq("id", courseId);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putCourse = async (
  courseId: string,
  course: TCourse,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Courses")
      .update(course)
      .eq("id", courseId)
      .select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCourse = async (
  courseId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Courses")
      .delete()
      .eq("id", courseId)
      .select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
