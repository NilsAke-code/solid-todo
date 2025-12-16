import { Title } from "@solidjs/meta";
import ToDoList from "~/components/ToDoList";

export default function Home() {
  return (
    <main>
      <Title>Todo-List</Title>
      <ToDoList />
    </main>
  );
}
