import { createSignal } from "solid-js";
import "./ToDoList.css";

export default function ToDoList() {
  const [text, setText] = createSignal("");
  const [uppgifter, setUppgifter] = createSignal< {text: string, completed: boolean} []>([]);

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

  function saveEdit(index: number) {
    const tempuppgifter = uppgifter();
    tempuppgifter[index].text = editText();
    setUppgifter([...tempuppgifter]);

    setEditIndex(null);
    setEditText("");
  }

  return (
    <div class="todo-list-page">

      <div class="container">

        <h1>Todo Lista</h1>

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

          <ul class="uppgifter">

            {uppgifter().map((item, index) => (

              <li classList={{ taskCompleted: item.completed }}>

                <input 
                  type="checkbox"
                  onChange={() => toggleCompleted(index)}
                  checked={item.completed}
                />

                {editIndex() === index ? (
                  <>
                    <input 
                      type="text"
                      value={editText()}
                      onInput={(e) => setEditText(e.currentTarget.value)} 
                    />

                    <button class="btn-save" onClick={() => saveEdit(index)}>
                      <i class="fa-solid fa-check" aria-hidden="true"></i>
                    </button>

                    <button class="btn-cancel" onClick={() => setEditIndex(null)}>
                      <i class="fa-solid fa-times" aria-hidden="true"></i>
                    </button>
                    </>
                  ) : (
                    <>
                      {item.text}

                      <button class="btn-edit" onClick={() => startEdit(index, item.text)}>
                        <i class="fa-solid fa-pencil" aria-hidden="true"></i>
                      </button>

                      <button class="btn-remove" onClick={() => removeUppgift(index)}>
                      Ta bort
                      </button>

                    
                    </>
                )}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
