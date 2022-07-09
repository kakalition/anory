import { useToast } from '@chakra-ui/react';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { AxiosResponse } from 'axios';
import { AuthContext } from '../AuthenticationWrapper';
import storyEntityJSONMapper from '../../Function/Mapper/StoryEntityJSONMapper';
import StoryEntity from '../../Type/StoryEntity';
import storyComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';

export default function useHomePageViewModel() {
  const toast = useToast();
  const user = useContext<any>(AuthContext);
  const [storyData, setStoryData] = useState<StoryEntity[] | null[]>(
    [null, null, null, null, null],
  );

  const showToast = (status: any, title: String, description: String | null = null) => {
    toast({
      title,
      description,
      containerStyle: { width: '100%' },
      duration: 2000,
      status,
    });
  };

  const onGetStoriesSuccess = (response: AxiosResponse) => {
    const entities = response.data.map((element: any) => storyEntityJSONMapper(element));
    setStoryData(entities);
  };

  const onGetStoriesFailed = (error: any) => showToast('error', error.response.data);

  const getStoriesAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/stories')
    .addParams({ count: 10 })
    .addOnSuccess(onGetStoriesSuccess)
    .addOnFailed(onGetStoriesFailed);

  const storiesElement = useMemo(
    () => storyComponentMapper(user.id, storyData, getStoriesAPI.call),
    [storyData],
  );

  useEffect(() => {
    getStoriesAPI.call();
  }, []);

  return {
    storiesElement,
  };
}
