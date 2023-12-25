import { SupabaseClient } from "@supabase/supabase-js";
import { TAssignment } from "./assignment.validation";

export const createAssignment = async (
  assignment: TAssignment,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Assignments")
      .insert(assignment)
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

export const getAssignment = async (
  assignmentId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Assignments")
      .select("*")
      .eq("id", assignmentId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putAssignment = async (
  assignmentId: string,
  supabase: SupabaseClient,
  assignment: TAssignment
) => {
  try {
    const { data, error } = await supabase
      .from("Assignments")
      .update(assignment)
      .eq("id", assignmentId)
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

export const deleteAssignment = async (
  assignmentId: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("Assignments")
      .delete()
      .eq("id", assignmentId)
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
