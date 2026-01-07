
type ViewItemProps = {
    text: string;
    onEdit: () => void;
    onRemove: () => void;
}





export default function ViewItem(props: ViewItemProps) {

    return(
        <>
            <span class="flex-1 break-all">
                {props.text}
            </span>

            <div class="flex items-center gap-4 shrink-0">
                <button class="btn-edit" onClick={props.onEdit}>
                    <i class="fa-solid fa-pencil" aria-hidden="true"></i>
                </button>

                
                <button class="btn-remove" onClick={props.onRemove}>
                    Ta bort
                </button>
            </div>
        </>
    )
}