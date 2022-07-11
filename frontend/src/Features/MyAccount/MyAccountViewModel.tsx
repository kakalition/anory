import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { compose, map, prop } from 'ramda';
import storyJsonMapper from '../../Function/Mapper/StoryJsonMapper';
import StoryEntity from '../../Type/StoryEntity';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';
import { AuthContext } from '../AuthenticationWrapper';
import commentJsonMapper from '../../Function/Mapper/CommentJSONMapper';
import CommentEntity from '../../Type/CommentEntity';
import StoryComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import CommentComponentMapper from '../../Function/Mapper/CommentComponentMapper';

export default function useMyAccountViewModel() {
  const user = useContext<any>(AuthContext);

  const [storiesData, setStoriesData] = useState<(StoryEntity | null)[]>([null, null, null]);
  const [isStoriesDataDirty, setIsStoriesDataDirty] = useState(false);

  const onFetchStoriesDataSuccess = compose(
    setStoriesData,
    map(storyJsonMapper),
    prop<string, any>('data'),
  );

  const fetchStoriesData = NewApiCallBuilder.getInstance()
    .addEndpoint('api/users/stories')
    .addMethod('GET')
    .addParams({ count: 3 })
    .addOnSuccess(onFetchStoriesDataSuccess);

  useEffect(() => {
    fetchStoriesData.call();
    setIsStoriesDataDirty(false);
  }, [isStoriesDataDirty]);

  const [commentsData, setCommentsData] = useState<(CommentEntity | null)[]>([null, null, null]);
  const [isCommentsDataDirty, setIsCommentsDataDirty] = useState(false);

  const onFetchCommentsSuccess = compose(
    setCommentsData,
    map(commentJsonMapper),
    prop<string, any>('data'),
  );

  const fetchCommentsAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/users/comments')
    .addParams({ count: 3 })
    .addMethod('GET')
    .addOnSuccess(onFetchCommentsSuccess);

  useEffect(() => {
    fetchCommentsAPI.call();
    setIsCommentsDataDirty(false);
  }, [isCommentsDataDirty]);

  const storiesElement = useMemo(
    () => StoryComponentMapper.array(user.id, storiesData, () => setIsStoriesDataDirty(true)),
    [storiesData],
  );

  const commentsElement = useMemo(
    () => CommentComponentMapper.array(
      user.id,
      commentsData,
      () => setIsCommentsDataDirty(true),
      () => setIsCommentsDataDirty(true),
    ),
    [commentsData],
  );

  return {
    storiesElement,
    commentsElement,
  };
}
