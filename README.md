# React Server Components Minimal Form Examples with Next.js

This is an example repo for showing some simple patterns of using React Server Components,
through Next.js, to submit simple forms with server actions and get validation errors back
if they exist.

It uses an array to store the data temporarily, simulating a some data store, and `revalidatePath`
to trigger a revalidation of the form after a submission.

## Getting Started

```bash
npm i && npm run dev
```

## Basic Form

The first form is a `BasicForm` component which shows a simple todo form and accompanying server
action for creating a todo. You can disable JavaScript in your browser to see that this form
still works without JavaScript. Next.js will send back the entire page with the new todo item
you created rendered to HTML (check the preview in the network tab).

## Form with State

The second form is a `FormWithState` component which shows a duplicate of the `BasicForm` except
it subscribes to `useFormState`, so it is a `"use client"` component. The accompanying server
action does mostly the same thing as the first form, except it returns an object with `errors` that
will contain an array of errors if there were any (missing fields) or an empty array if ther are none.

What is really cool about this form is that, even though it is a `"use client"` component, it still
works without JavaScript. If you disable JavaScript in your browser, you will see that the form still
works and you will get the validation errors back in the response.

## Submit Button

Both forms have an additional submit button that uses `useFormStatus` to show how that works, and that
the `SubmitButton` component can be reused in any form. `useFormStatus` is required to be called inside
a form component (some child of form) to work and I see a lot of people get confused by that. I think
you can see why it makes sense for the React team to implement this feature in such a way when you see
how it is used.

The `SubmitButton` is also a progressively enhanced button. If you disable JavaScript, it won't break
anything and will submit just fine. But with JS enabled, it will showing some pending text and disable
the button until the form is done submitting.
