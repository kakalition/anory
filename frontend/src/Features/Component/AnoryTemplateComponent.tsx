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
import React, { useState } from 'react';
import Spacer from '../Utilities/Spacer';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';
import SideNavBarComponent from './SideNavBarComponent';
import TopBarComponent from './TopBarComponent';

type Params = {
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
  categoriesElement: React.ReactNode,
  onSubmitStoryClick: React.MouseEventHandler,
  children?: React.ReactNode
};

export default function AnoryTemplateComponent(params: Params) {
  const {
    isModalOpen, openModal, closeModal, categoriesElement, onSubmitStoryClick, children,
  } = params;
  const [activeTab, setActiveTab] = useState('alls');

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
          {children}
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
