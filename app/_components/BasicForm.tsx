import { createTodo } from "../_actions/todo";

/**
 * This example shows how to use a server action with a form that uses no JS.
 * If you disable JS in the browser, the form will still submit and update the
 * page with the new todo.
 */
export function BasicForm() {
  return (
    <div>
      <h3>Basic Form</h3>
      {/* We don't need the method, it will always be post from a server action */}
      <form action={createTodo}>
        <label>
          Title:
          <input type="text" name="title" defaultValue="New Todo" />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            defaultValue="Todo form with no JS"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
