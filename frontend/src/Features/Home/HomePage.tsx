import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';
import useHomePageViewModel from './useHomePageViewModel';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');
  const {
    isModalOpen, openModal, closeModal, onSubmitStoryClick, categoriesElement, storiesElement,
  } = useHomePageViewModel();

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <div className="w-full h-[8%]">
        <TopBarComponent />
      </div>
      <div className="flex relative flex-row w-full h-[92%]">
        <div className="w-[20%] h-full">
          <SideNavBarComponent activeTab={activeTab} onFABClick={openModal} />
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
            {storiesElement}
          </div>
          <Spacer height="1.5rem" />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="6xl" isCentered>
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
                <FormLabel htmlFor="categories">Categories</FormLabel>
                <Select id="categories" placeholder="Select category">
                  {categoriesElement}
                </Select>
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
            <AnoryPrimaryButtonComponent text="Post" onClick={onSubmitStoryClick} paddingX="2rem" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
