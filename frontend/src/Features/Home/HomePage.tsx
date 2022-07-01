import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import GetCategoriesUseCase from '../../UseCases/Category/GetCategoriesUseCase';
import CreateStoryUseCase from '../../UseCases/Story/CreateStoryUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [storyData, setStoryData] = useState<any[]>([]);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const onSubmitStoryClick: React.MouseEventHandler = () => {
    CreateStoryUseCase.handle(
      {
        categoryId: parseInt((document.getElementById('categories') as HTMLSelectElement).value, 10),
        title: (document.getElementById('title') as HTMLInputElement).value,
        body: (document.getElementById('body') as HTMLTextAreaElement).value,
      },
      (response) => console.log('success'),
      (error) => console.error(error.response),
    );
  };

  useEffect(() => {
    GetCategoriesUseCase.handle((response) => setAvailableCategories(response.data));

    GetStoriesUseCase.handle(
      10,
      null,
      (response) => {
        setStoryData(response.data);
        console.log(response.data);
      },
      (error) => console.error(error.response.data),
    );
  }, []);

  const categoriesElement = useMemo(() => availableCategories.map(
    (element) => <option key={element.id} value={element.id}>{element.name}</option>,
  ), [availableCategories]);

  const elements = useMemo(() => storyData.map((element) => (
    <StoryTileComponent
      key={element.id}
      id={element.id}
      title={element.title}
      body={_.truncate(element.body)}
      totalLikes={element.likes}
      totalComments={element.comments_count}
      totalViews={element.views}
      uploadedAt={(new Date(element.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
    />
  )), [storyData]);

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
