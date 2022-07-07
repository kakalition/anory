import {
  Button, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import APICallBuilder from '../../UseCases/APICallBuilder';
import LogoutUseCase from '../../UseCases/Auth/LogoutUseCase';
import AnnotationIcon from './Icons/AnnotationIcon';
import SearchIcon from './Icons/SearchIcon';

export default function TopBarComponent() {
  const navigator = useNavigate();

  const onIconClick: React.MouseEventHandler = () => navigator('/app');

  const onLogoutSuccess = (response: AxiosResponse) => {
    if (response.status === 204) navigator('/login');
    else console.log(response);
  };

  const logoutAPI = new APICallBuilder()
    .addAction(LogoutUseCase.create())
    .addOnSuccess(onLogoutSuccess)
    .addOnFailed((error) => console.error(error.response.data));

  const onLogoutClick: React.MouseEventHandler = () => logoutAPI.call();

  return (
    <div className="flex flex-row justify-between items-center py-3 px-16 w-full h-full bg-white border-b-2 border-b-gray-200">
      <button
        type="button"
        className="w-12 h-12 stroke-gray-900 stroke-[0.08rem]"
        onClick={onIconClick}
      >
        <AnnotationIcon />
      </button>
      <InputGroup className="mx-16">
        <InputLeftElement pointerEvents="none">
          <div className="flex items-center m-2 w-full h-full stroke-gray-900 stroke-[0.08rem]">
            <SearchIcon />
          </div>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Adventure to Mount Everest"
          bg="#FAFAFA"
          focusBorderColor="#232323"
        />
      </InputGroup>
      <Button variant="outline" onClick={onLogoutClick}>Logout</Button>
    </div>
  );
}
