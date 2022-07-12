import { useToast } from '@chakra-ui/react';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { compose, prop, map } from 'ramda';
import storyJsonMapper from '../../Function/Mapper/StoryJsonMapper';
import commentJsonMapper from '../../Function/Mapper/CommentJSONMapper';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';
import StoryEntity from '../../Type/StoryEntity';
import CommentEntity from '../../Type/CommentEntity';
import { AuthContext } from '../AuthenticationWrapper';
import StoryComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import CommentComponentMapper from '../../Function/Mapper/CommentComponentMapper';

// TODO: use mapper on axios response
// change story detail to storytile and use storymapper

export default function useStoryViewModel() {
  const params = useParams();
  const toast = useToast();
  const user = useContext<any>(AuthContext);
  const [storyData, setStoryData] = useState<StoryEntity | null>(null);
  const [commentsData, setCommentsData] = useState<(CommentEntity | null)[]>([null, null, null]);

  const showToast = (status: any, title: String, description: String | null = null) => {
    toast({
      title,
      description,
      containerStyle: { width: '100%' },
      duration: 2000,
      status,
    });
  };

  const onInitialCommentCallback = () => {
    if (commentsData === null) return;
    const temporary = [...commentsData];
    temporary?.unshift(null);
    setCommentsData(temporary);
  };

  const onSuccessfullCommentCallback = (commentData: CommentEntity) => {
    if (commentsData === null) return;
    const temporary = [...commentsData.filter((value) => value !== null)];
    temporary.unshift(commentData);
    setCommentsData(temporary);

    showToast('success', 'Post Comment Successfull!');
  };

  const onFailedCommentCallback = (message: any) => {
    if (commentsData === null) return;
    const temporary = [...commentsData.filter((value) => value !== null)];
    setCommentsData(temporary);

    showToast('error', 'Failed to Post Comment!', message);
  };

  const onFetchStorySuccess = compose(
    setStoryData,
    storyJsonMapper,
    prop<string, any>('data'),
  );

  const fetchStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/stories/${params.id}`)
    .addMethod('GET')
    .addOnSuccess(onFetchStorySuccess)
    .addOnFailed((error) => showToast('error', 'Failed to Get Story!', error.response.data.message));

  const log = (a: any) => {
    console.log(a);
    return a;
  };

  const onFetchCommentsSuccess = compose(
    setCommentsData,
    log,
    map(commentJsonMapper),
    prop<string, any>('data'),
  );

  const fetchCommentsAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/stories/${params.id}/comments`)
    .addMethod('GET')
    .addOnSuccess(onFetchCommentsSuccess)
    .addOnFailed((error) => showToast('error', 'Failed to Get Comment!', error.response.data.message));

  useEffect(() => {
    if (params.id === undefined) return;

    fetchStoryAPI.call();
    fetchCommentsAPI.call();
  }, []);

  const storyTileElement = useMemo(
    () => StoryComponentMapper.single(user.id, storyData, fetchStoryAPI.call),
    [storyData],
  );

  const commentsElement = useMemo(
    () => CommentComponentMapper.array(user.id, commentsData, fetchCommentsAPI.call),
    [commentsData],
  );

  return {
    storyTileElement,
    commentsElement,
    storyId: storyData?.id,
    commentsCount: commentsData.filter((value) => value !== null).length,
    onInitialCommentCallback,
    onSuccessfullCommentCallback,
    onFailedCommentCallback,
  };
}
