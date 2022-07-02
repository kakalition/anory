import { Skeleton, SkeletonText } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetCommentsUseCase from '../../UseCases/Comment/GetCommentsUseCase';
import GetStoryUseCase from '../../UseCases/Story/GetStoryUseCase';
import CommentSectionComponent from '../Component/CommentSectionComponent';
import CommentTileComponent from '../Component/CommentTileComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

export default function StoryPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('alls');
  const [storyData, setStoryData] = useState<any>({});
  const [commentsData, setCommentsData] = useState<any[] | null>(null);

  useEffect(() => {
    if (params.id === undefined) {
      return;
    }

    GetStoryUseCase.handle(
      parseInt(params.id, 10),
      (response) => setStoryData(response.data),
      (error) => console.error(error.response.data),
    );

    GetCommentsUseCase.handle(
      parseInt(params.id, 10),
      (response) => {
        setCommentsData(response.data);
        console.log(response.data);
      },
      (error) => console.error(error.response.data),
    );
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
      <StoryTileComponent
        id={storyData.id}
        variant="detail"
        title={storyData.title}
        body={storyData.body}
        totalLikes={storyData.likes}
        totalComments={storyData.comments_count}
        totalViews={storyData.views}
        uploadedAt={(new Date(storyData.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      />
    );
  }, [storyData]);

  const elements = useMemo(() => {
    if (commentsData === null) {
      return (
        <>
          <div className="p-[1.5rem] w-full bg-white rounded-md shadow-sm">
            <Skeleton height="1rem" />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={2} />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={1} />
          </div>
          <div className="p-[1.5rem] w-full bg-white rounded-md shadow-sm">
            <Skeleton height="1rem" />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={2} />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={1} />
          </div>
          <div className="p-[1.5rem] w-full bg-white rounded-md shadow-sm">
            <Skeleton height="1rem" />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={2} />
            <Spacer height="1rem" />
            <SkeletonText noOfLines={1} />
          </div>
        </>
      );
    }

    return commentsData?.map((element: any) => (
      <CommentTileComponent
        userId="x"
        postDate={element.created_at}
        comment={element.comment}
        totalLikes={-1}
      />
    ));
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
          <CommentSectionComponent storyId={storyData.id} commentsCount={storyData.comments_count}/>
          <div className="flex flex-col gap-6 w-full">
            {elements}
          </div>
          <Spacer height="2rem" />
        </div>
      </div>
    </div>
  );
}
