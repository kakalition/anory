import { Button, Select, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import GetStoryUseCase from '../../UseCases/Story/GetStoryUseCase';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import CommentSectionComponent from '../Component/CommentSectionComponent';
import CommentTileComponent from '../Component/CommentTileComponent';
import FilledHeartIcon from '../Component/Icons/FilledHeartIcon';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

const dummyDatas = [
  {
    userId: 'jh31hjk132h4kj3h4jk2h4k3j1h4jkn3kj4n',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex...',
    totalLikes: 82,
    postDate: '1 hour ago',
  },
  {
    userId: 'jh31hjk132h4kj3h4jk2h4k3j1h4jkn3kj4n',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex...',
    totalLikes: 82,
    postDate: '1 hour ago',
  },
  {
    userId: 'jh31hjk132h4kj3h4jk2h4k3j1h4jkn3kj4n',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex...',
    totalLikes: 82,
    postDate: '1 hour ago',
  },
  {
    userId: 'jh31hjk132h4kj3h4jk2h4k3j1h4jkn3kj4n',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex...',
    totalLikes: 82,
    postDate: '1 hour ago',
  },
];

export default function StoryPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('alls');
  const [storyData, setStoryData] = useState<any>({});

  useEffect(() => {
    if (params.id === undefined) {
      return;
    }

    GetStoryUseCase.handle(
      parseInt(params.id, 10),
      (response) => setStoryData(response.data),
      (error) => console.error(error.response.data),
    );
  }, []);

  const elements = dummyDatas.map((element) => (
    <CommentTileComponent
      userId={element.userId}
      postDate={element.postDate}
      comment={element.comment}
      totalLikes={element.totalLikes}
    />
  ));

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
            <StoryTileComponent
              id={storyData.id}
              title={storyData.title}
              body={storyData.body}
              totalLikes={storyData.likes}
              totalComments={storyData.commentsCount}
              totalViews={storyData.views}
              uploadedAt={(new Date(storyData.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            />
          </div>
          <Spacer height="2rem" />
          <CommentSectionComponent />
          <div className="flex flex-col gap-6 w-full">
            {elements}
          </div>
          <Spacer height="2rem" />
        </div>
      </div>
    </div>
  );
}
