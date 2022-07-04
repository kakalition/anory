import { Skeleton, SkeletonText, useToast } from '@chakra-ui/react';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import GetCommentsUseCase from '../../UseCases/Comment/GetCommentsUseCase';
import GetStoryUseCase from '../../UseCases/Story/GetStoryUseCase';
import { AuthContext } from '../AuthenticationWrapper';
import CommentSectionComponent from '../Component/CommentSectionComponent';
import CommentTileComponent from '../Component/CommentTileComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';
import CommentSkeletonComponent from './Components/CommentSkeletonComponent';
import StoryDetailTileComponent from './Components/StoryDetailTileComponent';

export default function StoryPage() {
  const params = useParams();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('alls');
  const [storyData, setStoryData] = useState<any>({});
  const [commentsData, setCommentsData] = useState<any[] | null>(null);

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
      containerStyle: { width: '100%' },
      title: 'Post Comment Successfull!',
      status: 'success',
      duration: 2000,
    });
  };

  const onFailedCommentCallback = (message: any) => {
    if (commentsData === null) return;
    const temporary = [...commentsData.filter((value) => value !== null)];
    setCommentsData(temporary);

    toast({
      containerStyle: { width: '100%' },
      title: 'Post Comment Failed!',
      description: message,
      status: 'error',
      duration: 2000,
    });
  };

  const fetchStoryAction = () => {
    if (params.id === undefined) return;

    GetStoryUseCase.handle(
      parseInt(params.id, 10),
      (response) => {
        console.log(response.data);
        setStoryData(response.data);
      },
      (error) => console.error(error.response.data),
    );
  };

  const fetchCommentsAction = () => {
    if (params.id === undefined) return;

    GetCommentsUseCase.handle(
      parseInt(params.id, 10),
      (response) => {
        setCommentsData(response.data);
        console.log(response.data);
      },
      (error) => console.error(error.response.data),
    );
  };

  useEffect(() => {
    fetchStoryAction();
    fetchCommentsAction();
  }, []);

  const storyTile = useMemo(() => {
    if (storyData.id === undefined) {
      return (
        <div className="p-[1.5rem] w-full bg-white rounded-lg drop-shadow-sm">
          <Skeleton height="2rem" />
          <Spacer height="1rem" />
          <SkeletonText noOfLines={4} />
          <Spacer height="1rem" />
          <SkeletonText noOfLines={1} />
        </div>
      );
    }

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

  const commentsElement = useMemo(() => {
    if (commentsData === null) {
      return (
        <>
          <CommentSkeletonComponent />
          <CommentSkeletonComponent />
          <CommentSkeletonComponent />
        </>
      );
    }

    return commentsData?.map((element: any) => {
      if (element === null) {
        return <CommentSkeletonComponent />;
      }
      return (
        <CommentTileComponent
          id={element.id}
          userId="x"
          postDate={element.created_at}
          comment={element.comment}
          likeData={element.likeData}
        />
      );
    });
  }, [commentsData]);

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <div className="w-full h-[8%]">
        <TopBarComponent />
      </div>
      <div className="flex relative flex-row w-full h-[92%]">
        <div className="w-[20%] h-full">
          <SideNavBarComponent activeTab={activeTab} />
        </div>
        <div className="overflow-y-scroll pt-8 pr-16 pl-4 w-[80%]">
          <div className="flex flex-col gap-6">
            {storyTile}
          </div>
          <Spacer height="2rem" />
          <CommentSectionComponent
            storyId={storyData.id}
            commentsCount={commentsData?.length}
            onInitialCommentCallback={onInitialCommentCallback}
            onSuccessfullCommentCallback={onSuccessfullCommentCallback}
            onFailedCommentCallback={onFailedCommentCallback}
          />
          <div className="flex flex-col gap-6 w-full">
            {commentsElement}
          </div>
          <Spacer height="2rem" />
        </div>
      </div>
    </div>
  );
}
