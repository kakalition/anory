import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { compose, map, prop } from 'ramda';
import storyComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import storyJsonMapper from '../../Function/Mapper/StoryJsonMapper';
import CommentTileMapper from '../../Mapper/CommentTileMapper';
import StoryEntity from '../../Type/StoryEntity';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';
import { AuthContext } from '../AuthenticationWrapper';
import commentJsonMapper from '../../Function/Mapper/CommentJSONMapper';
import CommentEntity from '../../Type/CommentEntity';
import commentComponentMapper from '../../Function/Mapper/CommentComponentMapper';

export default function useMyAccountViewModel() {
  const user = useContext<any>(AuthContext);
  const [storiesData, setStoriesData] = useState<StoryEntity[] | null[]>([null, null, null]);
  const [commentsData, setCommentsData] = useState<CommentEntity[] | null[]>([null, null, null]);

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

  const fetchStoriesData = NewApiCallBuilder.getInstance()
    .addEndpoint('api/users/stories')
    .addMethod('GET')
    .addParams({ count: 3 })
    .addOnSuccess((response) => {
      setStoriesData(response.data.map(storyJsonMapper));
    });

  const storiesElement = useMemo(
    () => storyComponentMapper(user.id, storiesData, () => fetchStoriesData.call()),
    [storiesData],
  );

  const commentsElement = useMemo(
    () => commentComponentMapper(user.id, commentsData, () => fetchCommentsAPI.call()),
    [commentsData],
  );

  useEffect(() => {
    fetchCommentsAPI.call();
    fetchStoriesData.call();
  }, []);

  return {
    storiesElement,
    commentsElement,
  };
}
