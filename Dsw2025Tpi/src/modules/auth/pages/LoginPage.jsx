import { set, useForm } from 'react-hook-form';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { useState } from 'react';
import { loginUser } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
function LoginPage() {
  const {singIn, isAuthenticated}=useAuth()
  const [messageError,setmessageError]= useState('');
  const { register, handleSubmit, formState: { errors }} = useForm();
  const isAdmin = location.pathname.includes('/admin');
  const navigate = useNavigate();

  const onValid = async (formData) => {
    const{data,error}= await singIn(formData.userName,formData.password)
   if(error){
    setmessageError(error);
   }else{
    setmessageError('');
    navigate(isAdmin?'/admin/home':-1);
   }
  };

  const onInvalid = (errors) => {
    console.log("errors", errors);
  };
 
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
        )
      }
        <Button weight={"w-full"} type='submit' >Iniciar Sesion</Button>
        {!isAdmin&&(<><Button weight={"w-full"} onClick={()=>navigate('/signup')} >Registrarse</Button>
      <Button weight={"w-full"} onClick={()=>navigate(-1)} >Volver</Button>  
      </> )
        }
       </form>
    </div>
    </div>
    
  );
}

export default LoginPage;