
type ViewItemProps = {
    text: string;
    onEdit: () => void;
    onRemove: () => void;
}





export default function ViewItem(props: ViewItemProps) {

    return(
        <>
            <span class="flex-1 break-words whitespace-pre-wrap">
                {props.text}
            </span>

            <div class="flex items-start gap-4 shrink-0">
                <button class="btn-edit cursor-pointer" onClick={props.onEdit}>
                    <i class="fa-solid fa-pencil" aria-hidden="true"></i>
                </button>

                
                <button class="bg-[#023341] hover:bg-[#083b4b] rounded-r-md
                    text-white text-xs border-0 py-4 px-2 h-full right-1 cursor-pointer" 
                    onClick={props.onRemove}>
                    Ta bort
                </button>
            </div>
        </>
    )
}