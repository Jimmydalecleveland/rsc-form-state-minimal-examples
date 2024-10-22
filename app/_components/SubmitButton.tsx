"use client";
import { useFormStatus } from "react-dom";

/**
 * This is a progressively enhanced submit button that will disable
 * and show loading text while the form is pending when JS is enabled,
 * but will also function just fine without JS.
 *
 * This general loading state button can be used as a child of any form
 * element to hook into the form status, even if the form does not use
 * the useFormState hook.
 *
 * Notice how this same component is used in both forms but each button
 * only updates for the form it is nested under.
 */
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit (with pending state)"}
    </button>
  );
}
