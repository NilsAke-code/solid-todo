import { createSignal, onMount } from "solid-js";
import "./ToDoList.css";
import EditItem from "./EditItem";
import ViewItem from "./ViewItem";

export default function ToDoList() {

  const [text, setText] = createSignal("");
  const [uppgifter, setUppgifter] = createSignal<{text: string, completed: boolean} []>([]);

  const [editIndex, setEditIndex] = createSignal<number | null>(null);
  const [editText, setEditText] = createSignal("");

  onMount(() => {
    const saved = localStorage.getItem("uppgifter");
    if (saved) {
      setUppgifter(JSON.parse(saved));
    }
  });

  // function saveTasks(nyaUppgifter) {
  //   localStorage.setItem("uppgifter", JSON.stringify(nyaUppgifter));
  // }

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
    <div class="min-h-screen flex items-center justify-center p-4 bg-[#023341]">
      <div class="bg-sky-600 max-w-xl w-full rounded-lg py-10 px-8">
        <h1 class="text-3xl pb-4 text-blue-100 font-bold hover:bg-transparent">Todo Lista</h1>

        <div class="relative flex border-2 border-r-0 border-[#023341] rounded-md p-1 bg-white mb-6">

          <input
          class="flex-1 text-black text-sm leading-none py-1 pr-40 outline-none"
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

          <button class="absolute top-1/2 right-0 -translate-y-1/2
           bg-[#023341] hover:bg-[#083b4b] rounded-r-md
           text-white text-sm p-12 py-2 border-0 cursor-pointer" 
           onClick={(e) => AddUppgift()}>
            Lägg till
          </button>

        </div>

          <ul class="space-y-4 rounded-lg shadow-sm">

            {uppgifter().map((item, index) => (

              <li class="flex items-start gap-4 border-2 border-r-0 border-[#023341] bg-blue-200 hover:bg-white transition rounded-md" 
              classList={{ taskCompleted: item.completed }}>

                    <input
                      class="flex-shrink-0 h-4 w-4 cursor-pointer"
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
