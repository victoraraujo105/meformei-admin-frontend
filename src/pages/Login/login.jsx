import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { loginValidationSchema } from '../../schemas/validations/authentication.validations';
import {
  ActionLink,
  ActionLinksContainer,
  Button,
  Card,
  Container,
  ErrorLabel,
  InputField,
  ModalBackdrop,
  ModalContent,
  StyledLogoSvg,
  Subtitle,
  Title,
  TitleContainer
} from './login.styles.jsx';
// import { signin } from '../../api/AuthenticationAPI';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';

function handleEmailLogin() {
  // Lógica para login com email
}

function LoginPage() {
  const [loginError, setLoginError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordRecoveryModalOpen, setPasswordRecoveryModalOpen] = useState(false);

  const { signIn } = useContext(AuthContext);
  const navigate  = useNavigate();

  function handlePasswordRecovery(e) {
    e.preventDefault(); // prevent any default behavior
    setPasswordRecoveryModalOpen(true);
  }

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      setIsLoading(true);
      try {
        await signIn(values);
        setLoginError(null);
        navigate('/home');
      } catch (error) {
        actions.resetForm();
        setLoginError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    let anyTouched = Object.keys(touched).some(key => touched[key]);
    setShowUsernameError(anyTouched && errors.username);
    setShowPasswordError(anyTouched && errors.password);

    setIsButtonDisabled(showPasswordError || showUsernameError || loginError);
  }, [touched, errors, loginError, showPasswordError, showUsernameError]);

  useEffect(() => {
    if (touched.username || touched.password) {
      setLoginError(null);
    }
  }, [touched]);

  return (
    <Container>
      <Card>
        <TitleContainer>
          <StyledLogoSvg aria-hidden="true" />
          <Title>MeFormei</Title>
          <Subtitle>admin</Subtitle>
        </TitleContainer>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <InputField
            name='username'
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={showUsernameError}
            type="text"
            placeholder="Usuário"
            icon={faUser}
          />
          {showUsernameError && <ErrorLabel>{errors.username}</ErrorLabel>}

          <InputField
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={showPasswordError}
            type={passwordVisible ? "text" : "password"}
            placeholder="Senha"
            icon={faLock}
            toggleIcon={passwordVisible ? faEyeSlash : faEye}
            onToggle={() => setPasswordVisible(!passwordVisible)}
          />
          {showPasswordError && <ErrorLabel>{errors.password}</ErrorLabel>}

          <Button type='submit' disabled={isButtonDisabled}>{isLoading ? "Carregando..." : "Entrar"}</Button>

          <ActionLinksContainer>
            <ActionLink
              onClick={handleEmailLogin}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') handleEmailLogin(e);
              }}
            >
              Entrar com Email
            </ActionLink>
            <ActionLink
              onClick={handlePasswordRecovery}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') handlePasswordRecovery(e);
              }}
            >
              Esqueceu a senha?
            </ActionLink>
          </ActionLinksContainer>

          {loginError && <ErrorLabel style={{ marginTop: '1rem', textAlign: 'center', fontSize: '.8rem' }}>{loginError}</ErrorLabel>}
        </form>
      </Card>

      <ModalBackdrop isOpen={isPasswordRecoveryModalOpen} onClick={() => setPasswordRecoveryModalOpen(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <header>Recuperação de Senha</header>
          <p>Para recuperar a sua senha, por favor entre em contato com o suporte técnico.</p>
          <button onClick={() => setPasswordRecoveryModalOpen(false)}>Entendido</button>
        </ModalContent>
      </ModalBackdrop>


    </Container>
  );
}

export default LoginPage;
