import {
  Box,
  Button, Flex, Input, InputGroup, InputLeftElement, Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import AnoryLogo from '../Component/AnoryLogo';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import AnorySideNavButtonComponent from '../Component/AnorySideNavButtonComponent';
import AnnotationIcon from '../Component/Icons/AnnotationIcon';
import FilledChatAltIcon from '../Component/Icons/FilledChatAltIcon';
import FilledChatAlt from '../Component/Icons/FilledChatAltIcon';
import FilledHeartIcon from '../Component/Icons/FilledHeartIcon';
import SearchIcon from '../Component/Icons/SearchIcon';
import Spacer from '../Utilities/Spacer';

function TopBarComponent() {
  return (
    <div className="flex flex-row justify-between items-center py-3 px-16 w-full bg-white border-b-2 border-b-gray-200">
      <div className="w-12 h-12 stroke-gray-900 stroke-[0.08rem]">
        <AnnotationIcon />
      </div>
      <InputGroup className="mx-16">
        <InputLeftElement pointerEvents="none">
          <div className="flex items-center m-2 w-full h-full stroke-gray-900 stroke-[0.08rem]">
            <SearchIcon />
          </div>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Adventure to Mount Everest"
          bg="#FAFAFA"
          focusBorderColor="#232323"
        />
      </InputGroup>
      <Button variant="outline">Logout</Button>
    </div>
  );
}

function SideNavBarComponent({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex flex-col justify-between py-8 pr-8 pl-16 w-[20%] h-full">
      <div className="flex flex-col gap-3 w-full">
        <AnoryPrimaryButtonComponent text="New Post" onClick={() => console.log('implement')} />
        <Spacer height="0.75rem" />
        <AnorySideNavButtonComponent stateKey="alls" currentState={activeTab} text="All Stories" />
        <AnorySideNavButtonComponent stateKey="a" currentState={activeTab} text="Most Views" />
        <AnorySideNavButtonComponent stateKey="b" currentState={activeTab} text="Most Likes" />
        <AnorySideNavButtonComponent stateKey="c" currentState={activeTab} text="Most Replies" />
      </div>
      <div className="w-full">
        <AnoryLogo />
        <Spacer height="1rem" />
        <div className="flex flex-row">
          <button type="button">Terms of service</button>
          <Spacer width="0.5rem" />
          <button type="button">Accessibility</button>
        </div>
        <Spacer height="0.5rem" />
        <div className="flex flex-row">
          <button type="button">Privacy policy</button>
          <Spacer width="0.5rem" />
          <button type="button">Cookie policy</button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <TopBarComponent />
      <div className="flex flex-row w-full h-full">
        <SideNavBarComponent activeTab={activeTab} />
        <div className="pt-8 pr-16 w-[80%] h-full">
          <div className="flex flex-row gap-2 justify-between items-center">
            <Select placeholder="Sort Order" height="3rem">
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </Select>
            <Select placeholder="Sort By" height="3rem">
              <option value="views">Most Views</option>
              <option value="likes">Most Likes</option>
            </Select>
            <Select placeholder="Category" height="3rem">
              <option value="adventure">Adventure</option>
              <option value="honor">Honor Moment</option>
            </Select>
          </div>
          <Spacer height="1.5rem" />
          <Box width="full" bgColor="#FFFFFF" shadow="base" borderRadius="0.5rem" padding="1.5rem">
            <p className="font-roboto text-3xl font-medium">Stranger Things</p>
            <Spacer height="1rem" />
            <p className="font-roboto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
            <Spacer height="1rem" />
            <Flex>
              <div className="flex flex-row items-center">
                <div className="w-8 h-8 fill-[#FF4033]">
                  <FilledHeartIcon />
                </div>
                <Spacer width="0.7rem" />
                <p className="pt-[0.1rem] font-roboto text-lg">82</p>
              </div>
              <Spacer width='1rem' />
              <div className="flex flex-row items-center">
                <div className="w-8 h-8 fill-[#549DE1]">
                  <FilledChatAltIcon />
                </div>
                <Spacer width="0.7rem" />
                <p className="pt-[0.1rem] font-roboto text-lg">82</p>
              </div>
            </Flex>
          </Box>
        </div>
      </div>
    </div>
  );
}
