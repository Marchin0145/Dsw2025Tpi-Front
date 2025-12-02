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
    <div className='min-h-screen bg-teal-50 flex items-center justify-center p-6'>
    <div className='w-full max-w-md bg-white/90 backdrop-blur-sm p-8 shadow-xl rounded-xl border-0'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Inicio de sesión</h1>
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
        <Button weight={"w-full"} type='submit' style="bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-500 hover:border-teal-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md">Iniciar Sesión</Button>
        {!isAdmin&&(<><Button weight={"w-full"} onClick={()=>navigate('/signup')} style="bg-white hover:bg-teal-50 text-teal-500 border-2 border-teal-500 hover:border-teal-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md mt-3">Registrarse</Button>
      <Button weight={"w-full"} onClick={()=>navigate(-1)} style="bg-gray-500 hover:bg-gray-600 text-white border-2 border-gray-500 hover:border-gray-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md mt-3">Volver</Button>  
      </> )
        }
       </form>
    </div>
    </div>
    
  );
}

export default LoginPage;