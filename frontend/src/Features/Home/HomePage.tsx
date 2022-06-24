import {
  Button, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import AnoryLogo from '../Component/AnoryLogo';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import AnorySideNavButtonComponent from '../Component/AnorySideNavButtonComponent';
import AnnotationIcon from '../Component/Icons/AnnotationIcon';
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <TopBarComponent />
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col justify-between py-8 pr-8 pl-16 w-[20%] h-full">
          <div className="flex flex-col gap-3 w-full">
            <AnoryPrimaryButtonComponent text="New Post" onClick={() => console.log('implement')} />
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
        <div className="w-[80%] h-full" />
      </div>
    </div>
  );
}
