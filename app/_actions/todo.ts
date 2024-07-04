"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { todos } from "../_database/db";

export async function createTodo(formData: FormData) {
  // simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
  // simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

// Zod version ===========
// These would typically be exported in their own `types` file.
const TodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(10, "Title is too long: 100 characters max"),
  description: z.string().min(1, "Description is required"),
});
type Todo = z.infer<typeof TodoSchema>;

type State = {
  // You could manually type these out to be more explicit, if you like.
  errors?: z.typeToFlattenedError<Todo>["fieldErrors"];
  message?: string | null;
};

export async function createTodoWithZodValidation(
  prevState: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  // simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validationFields = TodoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create todo.",
    };
  }

  // Mutate the simulated DB
  todos.push({
    id: Date.now(),
    title: validationFields.data.title,
    description: validationFields.data.description,
    completed: false,
  });

  revalidatePath("/");
}
