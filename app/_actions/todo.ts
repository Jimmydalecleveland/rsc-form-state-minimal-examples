"use server";

import { revalidatePath } from "next/cache";
import { todos } from "../_database/db";

export async function createTodo(formData: FormData) {
  // We could cast these values but it would be a lie, as usual, because
  // the values could be a File type, or null, etc.
  const title = formData.get("title"); // We don't know what type this is
  const description = formData.get("description"); // We don't know what type this is

  if (typeof title !== "string" || typeof description !== "string") {
    throw new Error("Invalid form data");
  }

  // Mutate the simulated DB
  todos.push({
    id: Date.now(),
    title,
    description,
    completed: false,
  });

  // This invalidates the root path, causing the todos data to be refetched
  // as it is part of the root components fetched data.
  revalidatePath("/");
}

export async function createTodoWithFormState(
  prevState: { errors: Array<string> },
  formData: FormData
): Promise<{ errors: Array<string> }> {
  // We could cast these values but it would be a lie, as usual, because
  // the values could be a File type, or null, etc.
  const title = formData.get("title"); // We don't know what type this is
  const description = formData.get("description"); // We don't know what type this is

  if (
    !title ||
    typeof title !== "string" ||
    !description ||
    typeof description !== "string"
  ) {
    // This is all nested under this condition for type safety. We need
    // a return in the same condition block that checks all types for the
    // later code to be able to assume the fields are strings.
    const errors: string[] = [];
    if (!title || typeof title !== "string") {
      errors.push("Title is required");
    }
    if (!description || typeof description !== "string") {
      errors.push("Description is required");
    }
    return { errors };
  }

  // Mutate the simulated DB
  todos.push({
    id: Date.now(),
    title,
    description,
    completed: false,
  });

  // This invalidates the root path, causing the todos data to be refetched
  // as it is part of the root components fetched data.
  revalidatePath("/");
  return { errors: [] };
}
