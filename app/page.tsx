import { BasicForm } from "./_components/BasicForm";
import { FormWithState } from "./_components/FormWithState";
import { todos } from "./_database/db";

export default function Home() {
  // Typically you would await a fetch for todos here, but simply importing
  // the todos works the same for revalidation purposes.

  return (
    <main>
      <h1>RSC Form Example</h1>
      <BasicForm />

      <FormWithState />

      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
