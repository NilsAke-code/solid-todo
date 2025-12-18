
type ViewItemProps = {
    text: string;
    onEdit: () => void;
    onRemove: () => void;
}





export default function ViewItem(props: ViewItemProps) {

    return(
        <>
            {props.text}

            <button class="btn-edit" onClick={props.onEdit}>
                <i class="fa-solid fa-pencil" aria-hidden="true"></i>
            </button>

            <button class="btn-remove" onClick={props.onRemove}>
                Ta bort
            </button>
        </>
    )
}