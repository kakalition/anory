import {
  FormControl,
  FormLabel,
  Input,
  Select, Textarea,
} from '@chakra-ui/react';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';

import Spacer from '../Utilities/Spacer';
import useNewStoryViewModel from './NewStoryViewModel';

export default function NewStoryPage() {
  const { categoriesElement, onSubmitStoryClick } = useNewStoryViewModel();

  return (
    <AnoryTemplateComponent>
      <form>
        <FormControl>
          <FormLabel htmlFor="new-story-title-form">Title</FormLabel>
          <Input id="new-story-title-form" type="text" />
        </FormControl>
        <Spacer height="1.5rem" />
        <FormControl>
          <FormLabel htmlFor="new-story-category-form">Categories</FormLabel>
          <Select id="new-story-category-form" placeholder="Select category">
            {categoriesElement}
          </Select>
        </FormControl>
        <Spacer height="1.5rem" />
        <FormControl>
          <FormLabel htmlFor="new-story-body-form">Body</FormLabel>
          <Textarea
            id="new-story-body-form"
            minHeight="10rem"
            maxHeight="30rem"
          />
        </FormControl>
        <AnoryPrimaryButtonComponent text="Post Story" paddingX="2rem" onClick={onSubmitStoryClick} />
      </form>
    </AnoryTemplateComponent>
  );
}
