import { createContext, useEffect, useState } from 'react';
import GetUserDataUseCase from '../UseCases/Auth/GetUserDataUseCase';

export const AuthContext = createContext(null);

export default function AuthenticationWrapper(props: any) {
  const { children } = props;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    GetUserDataUseCase.handle(
      (response) => setUser(response.data),
      () => setUser(null),
    );
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
