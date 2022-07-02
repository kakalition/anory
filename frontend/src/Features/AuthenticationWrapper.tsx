import { useToast } from '@chakra-ui/react';
import {
  createContext, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import GetUserDataUseCase from '../UseCases/Auth/GetUserDataUseCase';

export const AuthContext = createContext(null);

export default function AuthenticationWrapper(props: any) {
  const { children } = props;
  const navigator = useNavigate();
  const toast = useToast();
  const toastRef = useRef<any>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    toastRef.current = toast({
      title: 'Authentication in Progress',
      containerStyle: { width: '100%' },
      duration: 10000,
      status: 'loading',
      position: 'top',
    });
    GetUserDataUseCase.handle(
      (response) => {
        setUser(response.data);
        toast.close(toastRef.current);
      },
      () => {
        toast.close(toastRef.current);
        navigator('/login');
      },
    );
  }, []);

  if (user === null) return <div />;

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
