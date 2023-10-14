"use client"
import { AuthService } from "@/services/auth.service";
import { Button, FilledInput, FormControl, FormHelperText, InputLabel } from "@mui/material";
import { Form, Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import * as yup from 'yup';
export default function Page() {

  const searchParams = useSearchParams()

  const email = searchParams.get('search')


  return (
    <SendEmailRecoverPassword email={email} />
  )

}

interface SendEmailRecoverPasswordProps {
  email: string | null;

}

function SendEmailRecoverPassword({ email }: SendEmailRecoverPasswordProps) {
  const formId = 'sendEmailRecoverPassword'
  const validationSchema = yup.object({
    email: yup.string().required("Email é obrigatorio"),
  })
  const initialValues = {
    email: email ?? ''
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmitForm = async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
    setIsLoading(true);

    try {
      await AuthService.sendRecoverPassword({ email: values.email })
      setTimeout(() => {
        toast.success('Solicitação enviada com sucesso!');
        setIsLoading(false);
        resetForm()
      }, 1000);
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar a solicitação.');
      setIsLoading(false);
    }
  }

  const [isEmailFocused, setEmailFocused] = useState(false);

  useEffect(() => {
    // Adicione ou remova a classe do elemento .content com base no estado do campo de email
    const contentElement = document.querySelector('.content');

    if (contentElement) {
      if (isEmailFocused) {
        contentElement.classList.add('hover:-translate-y-1', 'hover:scale-110');
      } else {
        contentElement.classList.remove('hover:-translate-y-1', 'hover:scale-110');
      }
    }
  }, [isEmailFocused]);

  return (
    <div className="content max-w-sm bg-white rounded-md shadow-2xl transition ease-in-out delay-150 transform-gpu duration-300 ">
      <div className="p-5 ">
        <div className="w-full flex justify-center mb-3">
          <p className="text-2xl">Esqueci minha senha</p>
        </div>

        <p className="text-sm text-slate-500"> Insira seu endereço de e-mail abaixo <br />para solicitar a redefinição de senha.</p>
        <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
          {({ values, handleBlur, handleChange, touched, errors, handleSubmit }) => (

            <Form className='form mt-3 max-w-md' id={formId} onSubmit={handleSubmit} >

              <FormControl variant="filled" sx={{ my: 3, mb: 4 }} fullWidth>
                <InputLabel htmlFor="email-component-filled">Email</InputLabel>
                <FilledInput id="email-component-filled"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onSelect={() => setEmailFocused(true)}
                  onBlur={(event) => { handleBlur(event); setEmailFocused(false) }}
                  onFocus={() => setEmailFocused(true)}
                  error={touched.email && Boolean(errors.email)}
                  color={"primary"}
                  inputProps={{ style: { backgroundColor: "#fff", borderRadius: 3 } }}
                />

                <FormHelperText id="email-component-filled">{touched.email && errors.email}</FormHelperText>
              </FormControl>


              <Button disabled={isLoading} variant="contained" type="submit" fullWidth> Enviar</Button>
            </Form>)}
        </Formik>
      </div>
    </div>
  )
}