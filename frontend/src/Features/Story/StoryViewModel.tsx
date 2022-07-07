import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentTileMapper from '../../Mapper/CommentTileMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetCommentsUseCase from '../../UseCases/Comment/GetCommentsUseCase';
import GetStoryUseCase from '../../UseCases/Story/GetStoryUseCase';
import StorySkeletonComponent from '../Component/StorySkeletonComponent';
import StoryDetailTileComponent from './Components/StoryDetailTileComponent';

export default function useStoryViewModel() {
  const params = useParams();
  const toast = useToast();
  const [storyData, setStoryData] = useState<any>({});
  const [commentsData, setCommentsData] = useState<any[]>([null, null, null]);

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

  const onSuccessfullCommentCallback = (commentData: any) => {
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

  const getStoryAPI = new APICallBuilder()
    .addAction(GetStoryUseCase.create())
    .addOnSuccess((response) => setStoryData(response.data))
    .addOnFailed((error) => showToast('error', 'Failed to Get Story!', error.response.data.message));

  const getCommentsAPI = new APICallBuilder()
    .addAction(GetCommentsUseCase.create())
    .addOnSuccess((response) => setCommentsData(response.data))
    .addOnFailed((error) => showToast('error', 'Failed to Get Story!', error.response.data.message));

  useEffect(() => {
    if (params.id === undefined) return;

    getStoryAPI
      .addPayload({ id: params.id })
      .call();

    getCommentsAPI
      .addPayload({ id: params.id })
      .call();
  }, []);

  const storyTileElement = useMemo(() => {
    if (storyData.id === undefined) return <StorySkeletonComponent />;

    return (
      <StoryDetailTileComponent
        id={storyData.id}
        title={storyData.title}
        body={storyData.body}
        likeData={storyData.likes}
        totalViews={storyData.views}
        uploadedAt={(new Date(storyData.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      />
    );
  }, [storyData]);

  const commentsElement = useMemo(
    () => CommentTileMapper.handle(commentsData),
    [commentsData],
  );

  return {
    storyTileElement,
    commentsElement,
    storyId: storyData.id,
    commentsCount: commentsData.filter((value) => value !== null).length,
    onInitialCommentCallback,
    onSuccessfullCommentCallback,
    onFailedCommentCallback,
  };
}
