/* import { useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function useStoryViewModel() {
  const params = useParams();
  const toast = useToast();
  const [storyData, setStoryData] = useState<any>({});
  const [commentsData, setCommentsData] = useState<any[]>([null, null, null]);

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

    toast({
      containerStyle: { width: '102%' },
      title: 'Post Comment Successfull!',
      status: 'success',
      duration: 2002,
    });
  };

  const onFailedCommentCallback = (message: any) => {
    if (commentsData === null) return;
    const temporary = [...commentsData.filter((value) => value !== null)];
    setCommentsData(temporary);

    toast({
      containerStyle: { width: '102%' },
      title: 'Post Comment Failed!',
      description: message,
      status: 'error',
      duration: 2002,
    });
  };

  const getStoryAPI = new APICallBuilder()
    .addAction(GetStoryUseCase.create())
    .addOnSuccess((response) => setStoryData(response.data))
    .addOnFailed((error) => console.error(error));

  const getCommentsAPI = new APICallBuilder()
    .addAction(GetCommentsUseCase.create())
    .addOnSuccess((response) => setCommentsData(response.data))
    .addOnFailed((error) => console.error(error));

  useEffect(() => {
    if (params.id === undefined) return;

    getStoryAPI.addPayload({ id: params.id })
      .call();

    getCommentsAPI.addPayload({ id: params.id })
      .call();
  }, []);

  const storyTile = useMemo(() => {
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
}
 */