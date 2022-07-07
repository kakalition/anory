import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetCategoriesUseCase from '../../UseCases/Category/GetCategoriesUseCase';

export default function useAnoryTemplateViewModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const showToast = (status: any, title: String, description: String | null = null) => {
    toast({
      title,
      description,
      containerStyle: { width: '100%' },
      duration: 2000,
      status,
    });
  };

  const onGetCategoriesSuccess = (response: AxiosResponse) => setAvailableCategories(response.data);
  const onGetCategoriesFailed = (error: any) => showToast('error', error.response.data.message, 'Try refresh this page.');

  const getCategoriesAPI = new APICallBuilder()
    .addAction(GetCategoriesUseCase.create())
    .addOnSuccess(onGetCategoriesSuccess)
    .addOnFailed(onGetCategoriesFailed);

  const categoriesElement = useMemo(() => availableCategories.map(
    (element) => <option key={element.id} value={element.id}>{element.name}</option>,
  ), [availableCategories]);

  useEffect(() => {
    getCategoriesAPI.call();
  }, []);

  return {
    isModalOpen: isOpen,
    openModal: onOpen,
    closeModal: onClose,
    categoriesElement,
  };
}
