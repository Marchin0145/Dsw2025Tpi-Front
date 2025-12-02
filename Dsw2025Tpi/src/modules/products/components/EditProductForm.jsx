import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { UpdateProductServices, GetProductByIdServices } from '../services/ProductServices';

export function EditProductForm({productId}) {
    const navigation = useNavigate();
  
    const [errorBackend, setErrorBackend] = useState("")
    const [product, setProduct] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            sku: "",
            internalCode: "",
            name: "",
            description: "",
            currentUnitPrice: 0,
            stockQuantity: 0
        },
    });

    const getProduct = async () => {
        console.log(productId)
        try {
            const productData = await GetProductByIdServices(productId);
            console.log(productData)
            setProduct(productData);
            reset(productData);
           
        } catch (error) {
            setErrorBackend("Error al cargar el producto");
        }
    };

    useEffect(() => {
        if (productId) getProduct();
    }, [productId, reset]);

    const onValid = async (formData) => {
        try {
            await UpdateProductServices(productId, JSON.stringify(formData));
            setErrorBackend("")
            navigation("/admin/products")
        } catch (error) {
            console.log(error)
            if (error.response.data?.error) {
                setErrorBackend(`Error(${error.response.data.error})`)
            } else {
                setErrorBackend("Error(Contactar al soporte)")
            }
        }
    };

    

    

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onValid)} className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <Input label="SKU" messageError={errors.sku?.message} inputProps={{ ...register('sku', { required: 'El sku es requerido' }) }}></Input>
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label="internalCode" messageError={errors.internalCode?.message} inputProps={{ ...register('internalCode', { required: 'El codigo Unico es requerido' }) }}></Input>
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='name' messageError={errors.name?.message} inputProps={{ ...register('name', { required: 'El nombre es requerido' }) }}></Input>
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='description' messageError={errors.description?.message} inputProps={{ ...register('description') }}></Input>
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='currentUnitPrice' messageError={errors.currentUnitPrice?.message} inputProps={{ type: 'number', ...register('currentUnitPrice', { required: 'El precio es requerido', min: { value: 0, message: 'El precio debe ser mayor a 0' } }) }}></Input>
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='stockQuantity' messageError={errors.stockQuantity?.message} inputProps={{ type: 'number', ...register('stockQuantity', { required: 'El stock es requerido', min: { value: 0, message: 'El stock debe ser mayor o igual a 0' } }) }}></Input>
                </div>

                <div className='flex flex-row justify-end gap-4 '>
                    <Button type="submit" style={'justify-end w-fit px-10'}>Actualizar</Button>
                    <Button type="button" style={'justify-end w-fit px-10'} onClick={() => { navigation('/admin/products') }}>Salir</Button>
                </div>
            </form>
            {errorBackend && <span className="text-xl text-red-400">{errorBackend}</span>}
        </div>
    )
}