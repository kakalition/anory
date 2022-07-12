import { useToast } from '@chakra-ui/react';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { AxiosResponse } from 'axios';
import { last } from 'ramda';
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
  const [showSpinner, setShowSpinner] = useState(false);
  const [shouldStopRefetch, setShouldStopRefetch] = useState(false);

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

  const storyEntityAndResponseEquality = (
    response: AxiosResponse,
  ) => last(storiesData)?.id === last(response.data as Array<StoryEntity>)?.id;

  const onGetStoriesSuccess = (response: AxiosResponse) => {
    // TODO: Modify this with real implementation
    if (last(storiesData) !== null && storyEntityAndResponseEquality(response)) {
      setShowSpinner(false);
      setShouldStopRefetch(true);
      return;
    }

    const entities = response.data.map(storyJsonMapper);
    setStoriesData(entities);
    setCount(count + 10);
    setShowSpinner(false);
  };

  const onGetStoriesFailed = (error: any) => {
    showToast('error', error.response.data);
    setShowSpinner(false);
  };

  const getStoriesAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/stories')
    .addParams({ count })
    .addOnSuccess(onGetStoriesSuccess)
    .addOnFailed(onGetStoriesFailed);

  const [storiesMark, markStoriesDirty] = useDirty();
  useEffect(() => {
    getStoriesAPI.call();
    console.log('marked dirty');
  }, [storiesMark]);

  const [shouldRefetchMark, markShouldRefetchDirty] = useDirty();
  useEffect(() => {
    if (shouldStopRefetch) {
      showToast('info', 'That\'s all stories we have!', 'Please come back later.');
      return;
    }

    setShowSpinner(true);
    getStoriesAPI
      .addParams({ count: count + 10 })
      .call();
  }, [shouldRefetchMark]);

  const storiesElement = useMemo(
    () => StoryComponentMapper.array(user.id, storiesData, markStoriesDirty),
    [storiesData],
  );

  return {
    storiesElement,
    markShouldRefetchDirty,
    showSpinner,
  };
}
