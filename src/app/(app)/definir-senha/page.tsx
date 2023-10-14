"use client"

import { AuthService } from "@/services/auth.service"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { Form, Formik } from "formik"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

import * as yup from "yup"

export default function Page() {
  const searchParams = useSearchParams()

  const recoverToken = searchParams.get('search')

  return (<DefinePassword token={recoverToken} />
  )
}

interface DefinePasswordProps {
  token: string | null;
}

function DefinePassword({ token }: DefinePasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const formId = 'definePassword'
  const validationSchema = yup.object({
    password: yup.string().required("Senha é obrigatoria").min(6, 'A senha deve ter no mínimo 6 caracteres').max(32, 'A senha deve ter no máximo 32 caracteres.').matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo'),
    passwordConfirmation: yup.string().required("Confirmação de senha é obrigatorio").min(6, 'A senha deve ter no mínimo 6 caracteres').max(32, 'A senha deve ter no máximo 32 caracteres.').matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo'),
  })
  const initialValues = {
    password: '',
    passwordConfirmation: ''
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const onSubmitForm = async (values: { password: string, passwordConfirmation: string }, { resetForm, setFieldError }: { resetForm: () => void, setFieldError: (field: string, message: string | undefined) => void }) => {
    setIsLoading(true);
    const { password, passwordConfirmation } = values
    try {
      const response = await AuthService.resetPassword({ token, password, passwordConfirmation })
      setTimeout(() => {
        toast.success(response.data.message);
        setIsLoading(false);
        resetForm()
        router.push('/login')
      }, 1000);
    } catch (error: any) {

      setFieldError('password', error.response.data.message[0])
      setFieldError('passwordConfirmation', error.response.data.message[1])

      toast.error('Ocorreu um erro ao tentar a solicitação.');

      setIsLoading(false);
    }
  }

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="content max-w-sm bg-white rounded-md shadow-2xl transition ease-in-out delay-150 transform-gpu duration-300 ">
      <div className="p-5 ">
        <div className="w-full flex justify-center mb-3">
          <p className="text-2xl">Definir nova senha</p>
        </div>
        {!token ?
          <div>

          </div>
          :
          <div>
            <p className="text-sm text-slate-500 text-center"> Insira sua nova senha abaixo</p>
            <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
              {({ values, handleBlur, handleChange, touched, errors, handleSubmit }) => (

                <Form className='form mt-4 mb-6 max-w-md' id={formId} onSubmit={handleSubmit} >

                  <FormControl variant="outlined" fullWidth sx={{ my: 2 }}>
                    <InputLabel htmlFor="password-component-filled">Senha</InputLabel>
                    <OutlinedInput
                      id="password-component-filled"
                      label="Senha"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      color={"primary"}
                      inputProps={{ style: { backgroundColor: "#fff", borderRadius: 3 } }}
                      type={showPassword ? 'text' : "password"}
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
                    />

                    <FormHelperText id="password-component-filled">{touched.password && errors.password}</FormHelperText>
                  </FormControl>


                  <FormControl variant="outlined" fullWidth sx={{ my: 2 }}>
                    <InputLabel htmlFor="passwordConfirmation-component-filled">Confirmação de Senha</InputLabel>
                    <OutlinedInput id="passwordConfirmation-component-filled"
                      label="Confirmação de senha"
                      name="passwordConfirmation"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                      color={"primary"}
                      inputProps={{ style: { backgroundColor: "#fff", borderRadius: 3 } }}
                      type={showPassword ? 'text' : "password"}
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
                    />

                    <FormHelperText id="passwordConfirmation-component-filled">{touched.passwordConfirmation && errors.passwordConfirmation}</FormHelperText>
                  </FormControl>



                </Form>)}


            </Formik>
            <Button disabled={isLoading} variant="contained" type="submit" form={formId} fullWidth> Enviar</Button>
          </div>

        }

      </div>
    </div>
  )
}