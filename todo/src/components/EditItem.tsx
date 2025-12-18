
type EditItemProps = {
    value: string;
    onChange: (value: string) => void;
    onSave: (value: string) => void;
    onCancel: () => void;
}



export default function EditItem(props: EditItemProps) {
    return (
        <>
            <input 
                type="text"
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)} 
            />

            <button class="btn-save" onClick={() => props.onSave(props.value)}>
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            </button>

            <button class="btn-cancel" onClick={props.onCancel}>
            <i class="fa-solid fa-times" aria-hidden="true"></i>
            </button>
        </>
    );
}