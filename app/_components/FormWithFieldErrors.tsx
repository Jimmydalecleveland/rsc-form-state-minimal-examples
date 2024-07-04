"use client";
import { useFormState } from "react-dom";
import { createTodoWithZodValidation } from "../_actions/todo";
import { SubmitButton } from "./SubmitButton";

const initialFormState = {
  message: null,
  errors: {},
};

/**
 * This third variant has a little more accessibility support with field level
 * errors (handled by zod parser in the server action) and a message state.
 */
export function FormWithFieldErrors() {
  const [state, dispatch] = useFormState(
    createTodoWithZodValidation,
    initialFormState
  );

  return (
    <div>
      <h3>Form With Field Level Errors</h3>
      <p>Submit with empty fields to see errors. </p>
      <p>Disable JavaScript in your browser and the form should still work.</p>
      <form action={dispatch}>
        {/* --- Title --- */}
        <label>
          Title:
          <input type="text" name="title" aria-describedby="title-error" />
        </label>
        {/* Error Fields for Title */}
        <FieldErrors id="title-error" errors={state?.errors?.title} />

        {/* --- Description --- */}
        <label>
          Description:
          <input
            type="text"
            name="description"
            aria-describedby="description-error"
          />
        </label>
        {/* Error Fields for Description */}
        <FieldErrors
          id="description-error"
          errors={state?.errors?.description}
        />

        {/* --- Submit --- */}
        <button type="submit">Submit</button>
        <SubmitButton />
      </form>

      {/* --- Form Level Error Message --- */}
      {state?.message ? (
        <span style={{ color: "red" }}>{state.message}</span>
      ) : null}
    </div>
  );
}

function FieldErrors({
  id,
  errors,
}: {
  id: string;
  errors: string[] | undefined;
}) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors
        ? errors.map((error) => (
            <span key={error} style={{ color: "red" }}>
              {error}
            </span>
          ))
        : null}
    </div>
  );
}
