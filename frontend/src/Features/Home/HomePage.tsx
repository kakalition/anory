import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure, useToast,
} from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import APICallBuilder from '../../UseCases/APICallBuilder';
import GetCategoriesUseCase from '../../UseCases/Category/GetCategoriesUseCase';
import CreateStoryUseCase from '../../UseCases/Story/CreateStoryUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import nCreateStoryUseCase from '../../UseCases/Story/NCreateStoryUseCase';
import { CreateStoryPayload } from '../../UseCases/Story/Payload/CreateStoryPayload';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import StorySkeletonComponent from '../Component/StorySkeletonComponent';
import StoryTileComponent from '../Component/StoryTileComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('alls');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [storyData, setStoryData] = useState<any[]>(null);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const showToast = (toastTitle: String, toastStatus: any) => {
    toast({
      title: toastTitle,
      containerStyle: { width: '100%' },
      duration: 2000,
      status: toastStatus,
    });
  };

  const fetchData = () => {
    new APICallBuilder()
      .addAction(GetCategoriesUseCase.create())
      .addOnSuccess((response) => setAvailableCategories(response.data))
      .addOnFailed((error) => console.error(error))
      .call();

    GetStoriesUseCase.handle(
      10,
      null,
      (response) => setStoryData(response.data),
      (error) => console.error(error.response.data),
    );
  };

  const onSuccessSubmitStory = () => {
    onClose();
    showToast('Story Created', 'success');
    fetchData();
  };

  const onFailedSubmitStory = () => {
    showToast('Failed to Create Story', 'error');
  };

  const onSubmitStoryClick: React.MouseEventHandler = () => {
    const storyPayload: CreateStoryPayload = {
      categoryId: parseInt((document.getElementById('categories') as HTMLSelectElement).value, 10),
      title: (document.getElementById('title') as HTMLInputElement).value,
      body: (document.getElementById('body') as HTMLTextAreaElement).value,
    };

    new APICallBuilder()
      .addAction(CreateStoryUseCase.create())
      .addPayload(storyPayload)
      .addOnSuccess(onSuccessSubmitStory)
      .addOnFailed(onFailedSubmitStory)
      .call();
  };

  const categoriesElement = useMemo(() => availableCategories.map(
    (element) => <option key={element.id} value={element.id}>{element.name}</option>,
  ), [availableCategories]);

  const elements = useMemo(() => {
    if (storyData !== null) {
      return storyData?.map((element) => (
        <StoryTileComponent
          key={element.id}
          variant="tile"
          id={element.id}
          title={element.title}
          body={_.truncate(element.body)}
          totalLikes={element.likes.length}
          totalComments={element.comments_count}
          totalViews={element.views}
          uploadedAt={(new Date(element.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        />
      ));
    }
    return (
      <>
        <StorySkeletonComponent />
        <StorySkeletonComponent />
        <StorySkeletonComponent />
        <StorySkeletonComponent />
        <StorySkeletonComponent />
      </>
    );
  }, [storyData]);

  useEffect(fetchData, []);

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
