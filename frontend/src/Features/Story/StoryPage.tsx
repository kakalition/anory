import { Button, Select, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

export default function StoryPage() {
  const [activeTab, setActiveTab] = useState('alls');

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
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center">
              <p className="font-roboto text-3xl text-black ">Comments</p>
              <Spacer width="1rem" />
              <p className="font-roboto text-3xl text-gray-500">| 34</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Select placeholder="Sort Order" height="3rem">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </Select>
              <Select placeholder="Sort By" height="3rem">
                <option value="ascending">Latest</option>
                <option value="descending">Oldest</option>
              </Select>
              <Button height="3rem" paddingX="3rem" variant="outline">Comment</Button>
            </div>
          </div>
          <Spacer height="2rem" />
          <Textarea placeholder="That was amazing!" />
          <Spacer height="1rem" />
          <div className="flex flex-row justify-end w-full">
            <AnoryPrimaryButtonComponent onClick={() => console.log('implements')} text="Post Comment" />
          </div>
        </div>
      </div>
    </div>
  );
}
