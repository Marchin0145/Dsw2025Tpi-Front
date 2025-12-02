export function Button({children,type,onClick,style,disabled}){
    return(
        <button disabled={disabled} className={`${style}  bg-gray-300   rounded-md shadow-lg transition hover:bg-gray-400`} type={type} onClick={onClick}>{children}</button>
    )
}