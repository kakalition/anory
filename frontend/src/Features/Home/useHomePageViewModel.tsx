import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import StoryTileMapper from '../../Mapper/StoryTileMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import CreateStoryUseCase from '../../UseCases/Story/CreateStoryUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import { CreateStoryPayload } from '../../UseCases/Story/Payload/CreateStoryPayload';

export default function useHomePageViewModel(closeModal: () => void) {
  const toast = useToast();
  const [storyData, setStoryData] = useState<any[]>([null, null, null, null, null]);

  const showToast = (status: any, title: String, description: String | null = null) => {
    toast({
      title,
      description,
      containerStyle: { width: '100%' },
      duration: 2000,
      status,
    });
  };

  const onGetStoriesSuccess = (response: AxiosResponse) => setStoryData(response.data);
  const onGetStoriesFailed = (error: any) => showToast('error', error.response.data);

  const getStoriesAPI = new APICallBuilder()
    .addAction(GetStoriesUseCase.create())
    .addParams({ count: 10 })
    .addOnSuccess(onGetStoriesSuccess)
    .addOnFailed(onGetStoriesFailed);

  const onSubmitStorySuccess = () => {
    closeModal();
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

  const storiesElement = useMemo(() => StoryTileMapper.handle(storyData), [storyData]);

  useEffect(() => {
    getStoriesAPI.call();
  }, []);

  return {
    storiesElement,
    onSubmitStoryClick,
  };
}
