import { Button, Select, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('alls');

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
              title="Lorem Ipsum"
              body="
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque
              ipsa quae ab illo inventore veritatis et quasi architecto beatae
              vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
              voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
              magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui
              in ea voluptate velit esse quam nihil molestiae
              consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
              "
              totalLikes={29}
              totalComments={21}
              totalViews={109}
              uploadedAt="June 24, 2022"
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
