import { createSignal } from "solid-js";
import "./ToDoList.css";

export default function ToDoList() {
  const [text, setText] = createSignal("");
  const [uppgifter, setUppgifter] = createSignal< {text: string, completed: boolean} []>([]);

  const AddUppgift = () => {
    setUppgifter([...uppgifter(), {text: text(), completed: false}]);
    setText("");
  }

  function toggleCompleted(index: number) {
    const tempuppgifter = uppgifter();
    tempuppgifter[index].completed = !tempuppgifter[index].completed;
    setUppgifter([...tempuppgifter]);
  }

  function removeUppgift(index: number) {
    const tempuppgifter = uppgifter().filter((_, i) => i !== index);
    setUppgifter(tempuppgifter);
  }

  return (
    <div class="todo-list-page">
      <div class="container">
        <h1>Todo Lista</h1>
        <div class="input-todo">
          <input placeholder="Skriv en uppgift" 
          type="text" 
          value={text()} 
          onInput={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              AddUppgift();
            }
          }}>

          </input>
          <button class="btn-add" onClick={(e) => AddUppgift()}>Lägg till</button>
        </div> 
          <ul>
            {uppgifter().map((item, index) => (
              <li classList={{ taskCompleted: item.completed }}>
                <input type="checkbox" onChange={() => toggleCompleted(index)} checked={item.completed}

                />
                {item.text}
                <button class="btn-remove" onClick={() => removeUppgift(index)}>Ta bort</button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
