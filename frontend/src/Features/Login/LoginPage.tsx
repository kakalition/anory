import {
  Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnoryLogo from '../Component/AnoryLogo';
import Spacer from '../Utilities/Spacer';

export default function LoginPage() {
  const navigator = useNavigate();

  const onSignUpClickListener: React.MouseEventHandler = () => {
    navigator('/register');
  };

  const onSignInClickListener: React.MouseEventHandler = () => {
    console.log('implement');
  };

  return (
    <div className="flex relative justify-center items-center w-screen h-screen bg-gray-50">
      <div className="p-16 w-[40%] bg-white rounded-lg">
        <h1 className="font-raleway text-5xl font-semibold text-black">Welcome Back!</h1>
        <Spacer height="3rem" />
        <form>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
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
            onClick={onSignInClickListener}
          >
            Sign In
          </Button>
        </form>
        <Spacer height="3rem" />
        <p>
          {'Don\'t have an account, yet? '}
          <button
            className="text-blue-600 underline"
            type="button"
            onClick={onSignUpClickListener}
          >
            Sign up here
          </button>
        </p>
      </div>
      <div className="absolute bottom-6">
        <AnoryLogo />
      </div>
    </div>
  );
}
