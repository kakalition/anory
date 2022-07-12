import { useToast } from '@chakra-ui/react';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { AxiosResponse } from 'axios';
import { AuthContext } from '../AuthenticationWrapper';
import storyJsonMapper from '../../Function/Mapper/StoryJsonMapper';
import StoryEntity from '../../Type/StoryEntity';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';
import StoryComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import useDirty from '../../Hooks/UseDirty';

export default function useHomePageViewModel() {
  const toast = useToast();
  const user = useContext<any>(AuthContext);
  const [count, setCount] = useState(0);

  const [storiesData, setStoriesData] = useState<(StoryEntity | null)[]>(
    [null, null, null, null, null]);

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
    const entities = response.data.map(storyJsonMapper);
    setStoriesData(entities);
  };

  const onGetStoriesFailed = (error: any) => showToast('error', error.response.data);

  const getStoriesAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/stories')
    .addParams({ count })
    .addOnSuccess(onGetStoriesSuccess)
    .addOnFailed(onGetStoriesFailed);

  const [isStoriesDirty, setIsStoriesDirty] = useState(true);
  useEffect(() => {
    getStoriesAPI.call();
    setIsStoriesDirty(false);
  }, [isStoriesDirty]);

  const [shouldRefetchMark, markShouldRefetchDirty] = useDirty();
  useEffect(() => {
    setCount(count + 10);
    getStoriesAPI
      .addParams({ count: count + 10 })
      .call();
  }, [shouldRefetchMark]);

  const storiesElement = useMemo(
    () => StoryComponentMapper.array(user.id, storiesData, () => setIsStoriesDirty(true)),
    [storiesData],
  );

  return {
    storiesElement,
    markShouldRefetchDirty,
  };
}
