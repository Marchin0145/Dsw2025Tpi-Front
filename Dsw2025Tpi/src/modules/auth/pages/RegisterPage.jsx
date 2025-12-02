import { useForm } from 'react-hook-form';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser,registerEmployee } from '../services/registerService';

function RegisterPage() {
  const [messageError, setMessageError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    }
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  

  const onValid = async (data) => {
    if (data.password !== data.confirmPassword) {
      setMessageError('Las contraseñas no coinciden');
      return;
    }
    
    console.log('Datos a enviar:', data);
   
    const { data: response, error } = isAdmin ? await registerEmployee(data) : await registerUser(data);
    if (error) {
      console.log('Error completo:', error.response?.data);
      const errorData = error.response?.data;
      if (Array.isArray(errorData) && errorData.length > 0) {
        setMessageError(errorData[0].description);
      } else {
        setMessageError(errorData?.message || 'Error al registrar el usuario');
      }
    } else {
      setMessageError('');
      alert('Usuario registrado exitosamente');
      isAdmin?navigate(-1):navigate('/');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-100 bg-white p-6 shadow-lg rounded-md border-2 border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>{isAdmin ? 'Registro de Empleado' : 'Registro de Usuario'}</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onValid)}>
          <Input
            label={"Nombre"}
            inputProps={{
              type: "text",
              ...register('name', {
                required: "El nombre es obligatorio"
              })
            }}
            messageError={errors.name?.message}
          />
          <Input
            label={"Usuario"}
            inputProps={{
              type: "text",
              ...register('username', {
                required: "El usuario es obligatorio"
              })
            }}
            messageError={errors.username?.message}
          />

          <Input
            label={"Email"}
            inputProps={{
              type: "email",
              ...register('email', {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })
            }}
            messageError={errors.email?.message}
          />
          <Input
            label={"Telefono"}
            inputProps={{
              type: "tel",
              ...register('phoneNumber', {
                required: "El teléfono es obligatorio"
              })
            }}
            messageError={errors.phoneNumber?.message}
          />
          <Input
            label={"Contrasena"}
            inputProps={{
              type: "password",
              ...register('password', {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })
            }}
            messageError={errors.password?.message}
          />
          <Input
            label={"Confirmar contrasena"}
            inputProps={{
              type: "password",
              ...register('confirmPassword', {
                required: "Confirma tu contraseña"
              })
            }}
            messageError={errors.confirmPassword?.message}
          />
          <span></span>
          {messageError && (
            <span className='text-red-500'>{messageError}</span>
          )}
          <Button weight={"w-full"} type='submit'>Registrarse</Button>
          <Button weight={"w-full"} type="button" onClick={() => navigate(-1)}>Volver</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;