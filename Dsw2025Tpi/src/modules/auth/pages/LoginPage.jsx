import { set, useForm } from 'react-hook-form';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { useState } from 'react';
import { loginUser } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function LoginPage() {
  const {singIn}=useAuth()
  const [messageError,setmessageError]= useState('');
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onValid = async (formData) => {
    const{data,error}= await singIn(formData.userName,formData.password)
   if(error){
    setmessageError(error);
   }else{
    setmessageError('');
    navigate('/admin/home');
   }
  };

  const onInvalid = (errors) => {
    console.log("errors", errors);
  };
 const handleProduct = async () => {
    const response = await fetch('api/products', {
      method: 'GET',
      headers: {
        'content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      alert('error');
      return;
    } else {
      const data = await response.json();
      alert(JSON.stringify(data));
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
    <div className='w-100 bg-white p-6 shadow-lg rounded-md border-2 border-gray-100'>
      <h1 className='text-3xl font-bold text-center'>Inicio de sesion</h1>
      <form className='flex flex-col gap-4'onSubmit={handleSubmit(onValid)}>
        <Input
          label={"Nombre"}
          inputProps={{
            type: "text",
            ...register('userName', {
              required: "El nombre es obligatorio"
            })
          }}
          messageError={errors.userName?.message}
        />
        <Input
          label={"Contrasena"}
          inputProps={{
            type: "password",
            ...register('password', { required: "La contrasena es obligatoria" })
          }}
          messageError={errors.password?.message}
        />
        <span></span>
        {messageError&&(
          <span className='text-red-500 '>{messageError}</span>
        )}
        <Button weight={"w-full"} type='submit' >Enviar</Button>
       </form>
    </div>
    </div>
    
  );
}

export default LoginPage;