import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
//import '../styles/tailwind.css';

//mutation이름은 front-end를 위한것임,back-end로 안넘어간다.
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;
interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };
  //console.log(data?.login.)
  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
      <div className='bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center'>
        <h3 className='text-2xl text-gray-800'>Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-5 px-5'
        >
          <input
            {...register('email', { required: 'Email is required' })}
            //name='email'
            //required
            type='email'
            placeholder='Email'
            className='input'
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            //required
            //name='password'
            type='password'
            placeholder='Password'
            className='input'
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage='Password must be more than 10 chars.' />
          )}
          <button className='mt-3 btn'>Log In</button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.console.error} />
          )}
        </form>
      </div>
    </div>
  );
};
