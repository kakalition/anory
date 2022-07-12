import {
  FormControl,
  FormLabel,
  Input,
  Select, Textarea,
} from '@chakra-ui/react';
import AnoryPrimaryButtonComponent from '../Component/AnoryPrimaryButtonComponent';
import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';

import Spacer from '../Utilities/Spacer';
import useNewStoryViewModel from './StoryEditorViewModel';

export default function StoryEditorPage() {
  const {
    title, setTitle,
    body, setBody,
    categoryId, setCategoryId,
    categoriesElement, onSubmitStoryClick,
    buttonText,
  } = useNewStoryViewModel();

  return (
    <AnoryTemplateComponent>
      <form>
        <FormControl>
          <FormLabel htmlFor="new-story-title-form">Title</FormLabel>
          <Input
            id="new-story-title-form"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <Spacer height="1.5rem" />
        <FormControl>
          <FormLabel htmlFor="new-story-category-form">Categories</FormLabel>
          <Select
            id="new-story-category-form"
            placeholder="Select category"
            value={categoryId}
            onChange={(event) => setCategoryId(parseInt(event.target.value, 10))}
          >
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
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </FormControl>
        <AnoryPrimaryButtonComponent text={buttonText} paddingX="2rem" onClick={onSubmitStoryClick} />
      </form>
    </AnoryTemplateComponent>
  );
}
