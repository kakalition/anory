import { useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import APICallBuilder from '../../UseCases/APICallBuilder';
import LoginUseCase from '../../UseCases/Auth/LoginUseCase';
import { LoginPayload } from '../../UseCases/Auth/Payload/LoginPayload';

export default class LoginViewModel {
  private navigator = useNavigate();

  private toast = useToast();

  private showToast = (status: any, message: any) => this.toast({
    title: message,
    containerStyle: { width: '100%' },
    duration: 10000,
    status,
    position: 'top',
  });

  private onLoginSuccess = (response: AxiosResponse) => {
    if (response.status === 200) this.navigator('/app');
    else this.showToast('info', response.data.message);
  };

  private onLoginFailed = (error: any) => this.showToast('error', error.response.data.message);

  private loginAPI = new APICallBuilder()
    .addAction(LoginUseCase.create())
    .addOnSuccess(this.onLoginSuccess)
    .addOnFailed(this.onLoginFailed);

  onSignUpClickListener: React.MouseEventHandler = () => this.navigator('/register');

  onSignInClickListener: React.MouseEventHandler = () => {
    const formData = new FormData(document.getElementById('login-form') as HTMLFormElement);
    const payload = {
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
    } as LoginPayload;

    this.loginAPI
      .addPayload(payload)
      .call();
  };
}
