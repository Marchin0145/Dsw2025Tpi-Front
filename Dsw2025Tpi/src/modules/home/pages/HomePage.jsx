import { getHomeStats } from "./services/homeServices.js"
import Card from "../../shared/components/Card"
import { useEffect, useState } from "react"
export function HomePage(){
   
const [formData,setFormData]=useState(
    {
        totalProducts:0,
        totalOrders:0,
    }
)



const getStats=async()=>{
    try {
            const response = await getHomeStats()
            console.log('Response from getHomeStats:', response)
            setFormData({
                totalProducts:response.productsCount,
                totalOrders:response.ordersCount,
            })
            console.log('FormData updated:', {
                totalProducts:response.productsCount,
                totalOrders:response.ordersCount,
            })
        } catch (error) {
            console.log('Error in getStats:', error)
        }
}

useEffect(
    ()=>{
        getStats()
    },[]
)
    return(
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold ">Datos</h1>
            <Card className='flex flex-col gap 3 justify-center '>
              <h2 className="text-2xl ">Productos</h2>
              <p className="text-md">Cantidad De Productos#<span>{formData.totalProducts}</span></p>
            </Card>
              <Card className='flex flex-col gap 3 justify-center '>
              <h2 className="text-2xl ">Ordenes</h2>
              <p className="text-md">Cantidad De Ordenes#<span>{formData.totalOrders}</span></p>
            </Card>
           
        </div>
    )
}