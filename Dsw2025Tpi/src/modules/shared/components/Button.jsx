export function Button({children,type,onClick,style}){
    return(
        <button className={`${style}  bg-gray-300   rounded-md shadow-lg transition hover:bg-gray-400`} type={type} onClick={onClick}>{children}</button>
    )
}