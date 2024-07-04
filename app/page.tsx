import { BasicForm } from "./_components/BasicForm";
import { ProgressivelyEnhancedForm } from "./_components/ProgressivelyEnhancedForm";
import { todos } from "./_database/db";

export default function Home() {
  return (
    <main>
      <h1>RSC Form Example</h1>
      <BasicForm />

      <ProgressivelyEnhancedForm />

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
