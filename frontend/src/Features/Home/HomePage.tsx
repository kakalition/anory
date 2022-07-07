import { Select } from '@chakra-ui/react';
import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';
import useAnoryTemplateViewModel from '../Component/useAnoryTemplateViewModel';
import Spacer from '../Utilities/Spacer';
import useHomePageViewModel from './useHomePageViewModel';

export default function HomePage() {
  const {
    isModalOpen, openModal, closeModal, categoriesElement,
  } = useAnoryTemplateViewModel();
  const { storiesElement, onSubmitStoryClick } = useHomePageViewModel(closeModal);

  return (
    <AnoryTemplateComponent
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
      categoriesElement={categoriesElement}
      onSubmitStoryClick={onSubmitStoryClick}
    >
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
    </AnoryTemplateComponent>
  );
}
