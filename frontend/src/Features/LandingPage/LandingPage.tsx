import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AnoryLogo from '../Component/AnoryLogo';
import Spacer from '../Utilities/Spacer';

export default function LandingPage() {
  const navigator = useNavigate();

  return (
    <div className="flex relative flex-col justify-center items-center p-24 w-screen h-screen bg-[#fffbfb]">
      <div className="flex absolute top-0 flex-row justify-between items-center p-8 w-full">
        <AnoryLogo />
        <Button variant="outline" onClick={() => navigator('/login')}>Login</Button>
      </div>
      <h1 className="font-raleway text-9xl font-semibold">Tell everyone your story!</h1>
      <Spacer height="3rem" />
      <h2 className="font-raleway text-6xl font-semibold leading-snug text-center">Without worrying someone else know it's yours.</h2>
      <Spacer height="5rem" />
      <div className="absolute bottom-24">
        <button type="button" className="p-4 hover:bg-gray-200 rounded-full transition" onClick={() => navigator('/register')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
