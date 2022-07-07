import { useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import APICallBuilder from '../../UseCases/APICallBuilder';
import { RegisterPayload } from '../../UseCases/Auth/Payload/RegisterPayload';
import RegisterUseCase from '../../UseCases/Auth/RegisterUseCase';

export default class RegisterViewModel {
  private navigator = useNavigate();

  private toast = useToast();

  private showToast = (status: any, message: any) => this.toast({
    title: message,
    containerStyle: { width: '100%' },
    duration: 10000,
    status,
    position: 'top',
  });

  private onRegisterSuccess = (response: AxiosResponse) => {
    if (response.status === 201) this.navigator('/app');
    else this.showToast('info', response.data.message);
  };

  private onRegisterFailed = (error: any) => this.showToast('error', error.response.data.message);

  private registerAPI = new APICallBuilder()
    .addAction(RegisterUseCase.create())
    .addOnSuccess(this.onRegisterSuccess)
    .addOnFailed(this.onRegisterFailed);

  onSignInClickListener: React.MouseEventHandler = () => this.navigator('/login');

  onRegisterClickListener: React.MouseEventHandler = async () => {
    const formData = new FormData(document.getElementById('register-form') as HTMLFormElement);

    const payload: RegisterPayload = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };

    this.registerAPI
      .addPayload(payload)
      .call();
  };
}
