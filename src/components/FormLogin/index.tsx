"use client"
import useAuth from "@/hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { LoginBody, loginValidationSchema } from "./validations/login";



export default function FormLogin(){
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmitLoginForm = async (values: LoginBody) => {
    setIsLoading(true);
    try {
      await signIn(values);
      router.push("/home")
    } catch (error) {
      formik.setErrors({ password: 'Usuario não reconhecido!' });
       
    } finally {
      setIsLoading(false);
    }
  } 
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values: LoginBody) => onSubmitLoginForm(values)
  });

   
  return (
  <>
    <form className='form mb-6' id="formlogin" onSubmit={formik.handleSubmit} >
              <FormControl sx={{mb: 3 }} fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  endAdornment={<InputAdornment position="end"><PersonIcon/></InputAdornment>}
                  label="Username"
                  name="username"
                  aria-describedby="username-helper-text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  
                />
                <FormHelperText id="username-helper-text">{formik.touched.username && formik.errors.username}</FormHelperText>
              </FormControl>

              <FormControl fullWidth  >
                <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    aria-describedby="password-helper-text"
        
                  />
                  <FormHelperText id="password-helper-text">{formik.touched.password && formik.errors.password}</FormHelperText>
              </FormControl>
            </form>
             <Button disabled={isLoading} type='submit' form='formlogin' variant="contained" fullWidth className='h-12'>Entrar</Button>
  </>
  )
}