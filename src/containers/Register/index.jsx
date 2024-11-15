import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import * as yup from "yup";

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer,
    Link,
 } from './styles';
import { useNavigate } from "react-router-dom";

export function Register() {
   const navigate = useNavigate() ;
  
   const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatorio'),
      email: yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
      password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos seis caracteres')
      .required('Digite uma senha'),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
      .required('confirme sua senha'),
    })
    .required();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    console.log(errors);


    const onSubmit = async (data) => {
      try {

        const { status }  = await api.post('/users', { 
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
        },
      );
      
         if(status === 200 || status === 201) {
          setTimeout(() => {
            navigate('/login')
          }, 2000);
          toast.success('Conta criada com sucesso!');
         } else if(status === 409){
          toast.error('Email já cadastrado! Faça o login para continuar');
         }else { 
            throw new Error();

         }
         
  
         // eslint-disable-next-line no-unused-vars
         } catch (error) {
          toast.error('Falha no sistema! Tente novamente' );
        }
      

    };
  
   
    return(
        <Container>
           <LeftContainer>
            <img src={Logo} alt='logo-devburger'/>
           </LeftContainer>
           <RightContainer>
            <Title>
               <span> Criar Conta</span>
            </Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <label>Nome</label>
                <input type="text" {...register('name')} />
                <p>{ errors?.name?.message}</p>
              </InputContainer> 
              
              <InputContainer>
                <label>Email</label>
                <input type="email" {...register('email')} />
                <p>{ errors?.email?.message}</p>
              </InputContainer> 

              <InputContainer>
                <label>Senha</label>
                <input type="password" {...register('password')}/>
                <p>{ errors?.password?.message}</p>
              </InputContainer>  

              <InputContainer>
                <label>Confirmar senha</label>
                <input type="password" {...register('confirmPassword')}/>
                <p>{ errors?.confirmPassword?.message}</p>
              </InputContainer>  
              
              <Button type="submit">CONFIRMAR CADASTRO</Button>
        
            </Form>
            <p>
                Ja possui conta ? <Link to= "/login">Clique aqui.</Link>
            </p>
           </RightContainer>
        </Container>
    );
} 