import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from './styles';
import { useUser } from "../../hooks/UserContext";
import PropTypes from 'prop-types';


const PasswordInput = ({ register, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <label>Senha</label>
      <input
        type={passwordVisible ? 'text' : 'password'}
        {...register('password')}
        placeholder="Digite sua senha"
        style={{ paddingRight: '80px' }}
      />
      <p>{error}</p>

      <button
        onClick={togglePasswordVisibility}
        type="button"
        style={{
          position: 'absolute',
          right: '10px',
          top: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {passwordVisible ? (
          <EyeSlash size={25} color="#333" />
        ) : (
          <Eye size={25} color="#333" />
        )}
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos seis caracteres')
        .required('Digite uma senha'),
    })
    .required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { data: userData } = await toast.promise(
      api.post('/sessions', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Verificando seus dados',
        success: {
          render() {
            setTimeout(() => {
            if(userData.admin){
              navigate('/pedidos');
            }else{
              navigate('/');
            }
            }, 2000);
            return 'Seja Bem-vindo(a)';
          },
        },
        error: 'Email ou Senha Incorretos',
      }
    );

    putUserData(userData);
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burguer!</span>
          <br />
          Acesse com seu <span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <PasswordInput register={register} error={errors?.password?.message} />
          </InputContainer>

          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
