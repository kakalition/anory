import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import storyComponentMapper from '../../Function/Mapper/StoryComponentMapper';
import storyJSONMapper from '../../Function/Mapper/StoryJSONMapper';
import CommentTileMapper from '../../Mapper/CommentTileMapper';
import StoryEntity from '../../Type/StoryEntity';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';
import { AuthContext } from '../AuthenticationWrapper';

export default function useMyAccountViewModel() {
  const user = useContext<any>(AuthContext);
  const [storiesData, setStoriesData] = useState<StoryEntity[] | null[]>([null, null, null]);
  const [commentsData, setCommentsData] = useState([null, null, null]);

  const fetchCommentsAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/users/comments')
    .addParams({ count: 3 })
    .addMethod('GET')
    .addOnSuccess((response) => setCommentsData(response.data));

  const fetchStoriesData = NewApiCallBuilder.getInstance()
    .addEndpoint('api/users/stories')
    .addMethod('GET')
    .addParams({ count: 3 })
    .addOnSuccess((response) => {
      setStoriesData(response.data.map(storyJSONMapper));
    });

  const storiesElement = useMemo(() => storyComponentMapper(user.id, storiesData), [storiesData]);
  const commentsElement = useMemo(
    () => CommentTileMapper.handle(commentsData, () => fetchCommentsAPI.call()),
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
