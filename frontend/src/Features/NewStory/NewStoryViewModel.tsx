import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetCategoriesUseCase from '../../UseCases/Category/GetCategoriesUseCase';
import CreateStoryUseCase from '../../UseCases/Story/CreateStoryUseCase';
import { CreateStoryPayload } from '../../UseCases/Story/Payload/CreateStoryPayload';

export default function useNewStoryViewModel() {
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

  const onSubmitStorySuccess = () => {
    showToast('success', 'Story Created');
  };

  const onSubmitStoryFailed = () => {
    showToast('error', 'Failed to Create Story');
  };

  const submitStoryAPI = new APICallBuilder()
    .addAction(CreateStoryUseCase.create())
    .addOnSuccess(onSubmitStorySuccess)
    .addOnFailed(onSubmitStoryFailed);

  const onSubmitStoryClick: React.MouseEventHandler = () => {
    const storyPayload: CreateStoryPayload = {
      categoryId: parseInt((document.getElementById('categories') as HTMLSelectElement).value, 10),
      title: (document.getElementById('title') as HTMLInputElement).value,
      body: (document.getElementById('body') as HTMLTextAreaElement).value,
    };

    submitStoryAPI
      .addPayload(storyPayload)
      .call();
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
    categoriesElement,
    onSubmitStoryClick,
  };
}
