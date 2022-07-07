import {
  Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react';
import AnoryLogo from '../Component/AnoryLogo';
import Spacer from '../Utilities/Spacer';
import RegisterViewModel from './RegisterViewModel';

export default function RegisterPage() {
  const viewModel = new RegisterViewModel();

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
            onClick={viewModel.onRegisterClickListener}
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
            onClick={viewModel.onSignInClickListener}
          >
            Sign in here
          </button>
        </p>
      </div>
      <div className="absolute bottom-6">
        <AnoryLogo />
      </div>
    </div>
  );
}
