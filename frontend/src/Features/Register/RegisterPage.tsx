import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import RegisterUseCase from '../../UseCases/Auth/RegisterUseCase';
import AnoryLogo from '../Component/AnoryLogo';
import Spacer from '../Utilities/Spacer';
import APICallBuilder from '../../UseCases/APICallBuilder';
import { RegisterPayload } from '../../UseCases/Auth/Payload/RegisterPayload';

export default function RegisterPage() {
  const navigator = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onRegisterSuccess = (response: AxiosResponse) => { if (response.status === 201) navigator('/app'); };

  const registerAPI = new APICallBuilder()
    .addAction(RegisterUseCase.create())
    .addOnSuccess(onRegisterSuccess)
    .addOnFailed((error) => setErrorMessage(error.response.data.message));

  const onSignInClickListener: React.MouseEventHandler = () => navigator('/login');

  const onRegisterClickListener: React.MouseEventHandler = async () => {
    const formData = new FormData(document.getElementById('register-form') as HTMLFormElement);

    const payload: RegisterPayload = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };

    registerAPI
      .addPayload(payload)
      .call();
  };

  return (
    <div className="flex relative flex-col justify-center items-center w-screen h-screen bg-gray-50">
      <div className="p-16 w-[40%] bg-white rounded-lg">
        <h1 className="font-raleway text-5xl font-semibold text-black">Create Account</h1>
        <Spacer height="3rem" />
        <form id="register-form">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Joseph Joestar"
              focusBorderColor="#232323"
            />
          </FormControl>
          <Spacer height="1rem" />
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="joseph@mail.com"
              focusBorderColor="#232323"
            />
          </FormControl>
          <Spacer height="1rem" />
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              focusBorderColor="#232323"
            />
          </FormControl>
          <Spacer height="2rem" />
          <Button
            height="3rem"
            bg="#FF9899"
            textColor="#FFFFFF"
            _hover={{ bg: '#FF8182' }}
            className="w-full"
            onClick={onRegisterClickListener}
          >
            Sign Up
          </Button>
        </form>
        <Spacer height="3rem" />
        <p>
          {'Already have an account? '}
          <button
            className="text-blue-600 underline"
            type="button"
            onClick={onSignInClickListener}
          >
            Sign in here
          </button>
        </p>
      </div>
      <div className="absolute bottom-6">
        <AnoryLogo />
      </div>
      <div className={`${errorMessage === null ? 'hidden' : 'block'} absolute bottom-6 px-8 w-full`}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
