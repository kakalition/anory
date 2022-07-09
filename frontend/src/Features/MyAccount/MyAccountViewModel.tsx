import { useEffect, useMemo, useState } from 'react';
import CommentTileMapper from '../../Mapper/CommentTileMapper';
import StoryTileMapper from '../../Mapper/StoryTileMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetUserCommentsUseCase from '../../UseCases/Comment/GetUserCommentsUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';

export default function useMyAccountViewModel() {
  const [storiesData, setStoriesData] = useState([null, null, null]);
  const [commentsData, setCommentsData] = useState([null, null, null]);

  const fetchCommentsAPI = new APICallBuilder()
    .addAction(GetUserCommentsUseCase.create())
    .addOnSuccess((response) => setCommentsData(response.data));

  const fetchStoriesData = new APICallBuilder()
    .addAction(GetStoriesUseCase.create())
    .addParams({ count: 3 })
    .addOnSuccess((response) => {
      setStoriesData(response.data);
    });

  const storiesElement = useMemo(() => StoryTileMapper.handle(storiesData), [storiesData]);
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
