import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

const dummyDatas = [
  {
    title: 'Weird Things',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    totalLikes: 20,
    totalComments: 12,
    totalViews: 9,
    uploadedAt: 'Juny 24, 2022',
  },
  {
    title: 'Funky Stranger',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    totalLikes: 109,
    totalComments: 20,
    totalViews: 11,
    uploadedAt: 'Juny 24, 2022',
  },
  {
    title: 'Horrible Creature at Night',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    totalLikes: 92,
    totalComments: 11,
    totalViews: 27,
    uploadedAt: 'Juny 24, 2022',
  },
  {
    title: 'Funky Stranger',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    totalLikes: 109,
    totalComments: 20,
    totalViews: 11,
    uploadedAt: 'Juny 24, 2022',
  },
  {
    title: 'Horrible Creature at Night',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    totalLikes: 92,
    totalComments: 11,
    totalViews: 27,
    uploadedAt: 'Juny 24, 2022',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const elements = dummyDatas.map((element) => (
    <StoryTileComponent
      title={element.title}
      body={element.body}
      totalLikes={element.totalLikes}
      totalComments={element.totalComments}
      totalViews={element.totalViews}
      uploadedAt={element.uploadedAt}
    />
  ));

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <div className="w-full h-[8%]">
        <TopBarComponent />
      </div>
      <div className="flex relative flex-row w-full h-[92%]">
        <div className="w-[20%] h-full">
          <SideNavBarComponent activeTab={activeTab} onFABClick={onOpen} />
        </div>
        <div className="overflow-y-scroll pt-8 pr-16 pl-4 w-[80%]">
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
          <div className="flex flex-col gap-6">
            {elements}
          </div>
          <Spacer height="1.5rem" />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post New Story</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input id="title" type="text" />
              </FormControl>
              <Spacer height="1.5rem" />
              <FormControl>
                <FormLabel htmlFor="body">Body</FormLabel>
                <Textarea
                  id="body"
                  minHeight="10rem"
                  maxHeight="30rem"
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost">Cancel</Button>
            <Spacer width="2rem" />
            <AnoryPrimaryButtonComponent text="Post" onClick={() => console.log()} paddingX="2rem" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
