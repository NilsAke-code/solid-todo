import { onMount } from "solid-js";


type EditItemProps = {
    value: string;
    onChange: (value: string) => void;
    onSave: (value: string) => void;
    onCancel: () => void;
}



export default function EditItem(props: EditItemProps) {
    let inputRef!:HTMLInputElement;

    onMount(() => {
        inputRef.focus();
    });
    return (
        <>
            <input
                class="flex-1 rounded border border-[#023341] px-2 py-1"
                type="text"
                ref={inputRef}
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        props.onSave(props.value);
                    }
                    if (e.key === "Escape") {
                        props.onCancel();
                    }
                }}
            />

            <div class="flex items-center gap-4 shrink-0">
            <button class="btn-save" onClick={() => props.onSave(props.value)}>
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            </button>

            <button class="btn-cancel" onClick={props.onCancel}>
            <i class="fa-solid fa-times" aria-hidden="true"></i>
            </button>
            </div>
        </>
    );
}