import { useParams } from 'react-router-dom'
import { EditProductForm } from "../components/EditProductForm"

export function EditProductPage(){
    const {id} = useParams()
    return(
        <div className='flex flex-col '>
           <EditProductForm productId={id} />
        </div>
    )
}