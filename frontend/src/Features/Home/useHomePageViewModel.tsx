import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import StoryTileMapper from '../../Mapper/StoryTileMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetCategoriesUseCase from '../../UseCases/Category/GetCategoriesUseCase';
import CreateStoryUseCase from '../../UseCases/Story/CreateStoryUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import { CreateStoryPayload } from '../../UseCases/Story/Payload/CreateStoryPayload';

export default function useHomePageViewModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [storyData, setStoryData] = useState<any[]>([null, null, null, null, null]);
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

  const onGetStoriesSuccess = (response: AxiosResponse) => setStoryData(response.data);
  const onGetStoriesFailed = (error: any) => showToast('error', error.response.data);

  const getStoriesAPI = new APICallBuilder()
    .addAction(GetStoriesUseCase.create())
    .addParams({ count: 10 })
    .addOnSuccess(onGetStoriesSuccess)
    .addOnFailed(onGetStoriesFailed);

  const onSubmitStorySuccess = () => {
    onClose();
    showToast('success', 'Story Created');
    getStoriesAPI.call();
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

  const categoriesElement = useMemo(() => availableCategories.map(
    (element) => <option key={element.id} value={element.id}>{element.name}</option>,
  ), [availableCategories]);

  const storiesElement = useMemo(() => StoryTileMapper.handle(storyData), [storyData]);

  useEffect(() => {
    getCategoriesAPI.call();
    getStoriesAPI.call();
  }, []);

  return {
    isModalOpen: isOpen,
    openModal: onOpen,
    closeModal: onClose,
    onSubmitStoryClick,
    categoriesElement,
    storiesElement,
  };
}
