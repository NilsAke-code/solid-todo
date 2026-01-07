import { createSignal } from "solid-js";
import "./ToDoList.css";
import EditItem from "./EditItem";
import ViewItem from "./ViewItem";

export default function ToDoList() {
  const [text, setText] = createSignal("");
  const [uppgifter, setUppgifter] = createSignal<{text: string, completed: boolean} []>([]);

  const [editIndex, setEditIndex] = createSignal<number | null>(null);
  const [editText, setEditText] = createSignal("");

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

  function startEdit(index: number, text: string) {
    setEditIndex(index);
    setEditText(text);
  }

  function saveEdit(index: number, value: string) {
    const tempuppgifter = uppgifter();
    tempuppgifter[index].text = value;
    setUppgifter([...tempuppgifter]);

    setEditIndex(null);
    setEditText("");
  }

  return (
    <div class="todo-list-page">

      <div class="container">

        <h1 class="text-8xl">Todo Lista</h1>

        <div class="input-wrapper">

          <input 
          placeholder="Skriv en uppgift"
          type="text" 
          value={text()} 
          onInput={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              AddUppgift();
            }
          }}>
          </input>

          <button class="btn-add" onClick={(e) => AddUppgift()}>
            Lägg till
          </button>

        </div>

          <ul class="space-y-4 rounded-lg shadow-sm">

            {uppgifter().map((item, index) => (

              <li class="flex items-center gap-4 border-2 border-[#023341] bg-blue-200 hover:bg-white transition px-3 py-3 rounded-md" 
              classList={{ taskCompleted: item.completed }}>

                <input 
                  type="checkbox"
                  onChange={() => toggleCompleted(index)}
                  checked={item.completed}
                />

               
                {editIndex() === index ? (
                  <EditItem value={editText()} onChange={(value) => setEditText(value)} onSave={(value) => saveEdit(index, value)} onCancel={() => setEditIndex(null)} />
                  ) : (
                  <ViewItem text={item.text} onEdit={() => startEdit(index, item.text)} onRemove={() => removeUppgift(index)}/>
                )}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
