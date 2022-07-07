import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import StoryTileMapper from '../../Mapper/StoryTileMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';

export default function useHomePageViewModel() {
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

  const storiesElement = useMemo(() => StoryTileMapper.handle(storyData), [storyData]);

  useEffect(() => {
    getStoriesAPI.call();
  }, []);

  return {
    storiesElement,
  };
}
