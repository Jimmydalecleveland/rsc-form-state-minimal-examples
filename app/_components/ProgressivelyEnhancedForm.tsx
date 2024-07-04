"use client";
import { useFormState } from "react-dom";
import { createTodoWithFormState } from "../_actions/todo";

const initialFormState = {
  errors: [],
};

/**
 * This variant of the BasicForm component uses the useFormState hook to manage
 * the form state by taking in a server action and creating a dispatch function
 * to replace where it normally would be passed (the action prop of the form).
 *
 * If you disable JS in the browser, the form will still submit and update the
 * page with the new todo. Even the error states will be displayed without JS enabled.
 *
 * Note: this requires a different function signature for the server action,
 * as it must now accept the previous state AND the form data. It also requires
 * an initial state to be passed, which can be whatever you want, but must match
 * the type the server action expects for the first argument.
 *
 * Note: there is a type gotcha you may run into with `useFormState` not accepting
 * your action, and this is commonly due to the action not returning the same type
 * as the initial state you pass as the 2nd argument to `useFormState`.
 */
export function ProgressivelyEnhancedForm() {
  const [state, dispatch] = useFormState(
    createTodoWithFormState,
    initialFormState
  );

  return (
    <div>
      <h3>Progressively Enhanced Form</h3>
      <p>Submit with empty fields to see errors. </p>
      <p>Disable JavaScript in your browser and the form should still work.</p>
      <form action={dispatch}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {state?.errors?.length > 0 ? (
        <ul>
          {state.errors.map((error) => (
            <li key={error} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
