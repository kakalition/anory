import { Button, Select, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import Spacer from '../Utilities/Spacer';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';

export default function CommentSectionComponent() {
  const [isCommentSectionShown, setIsCommentSectionShown] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center">
          <p className="font-roboto text-3xl text-black ">Comments</p>
          <Spacer width="1rem" />
          <p className="font-roboto text-3xl text-gray-500">| 34</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Select placeholder="Sort Order" height="3rem">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Select>
          <Select placeholder="Sort By" height="3rem">
            <option value="ascending">Latest</option>
            <option value="descending">Oldest</option>
          </Select>
          <Button height="3rem" paddingX="3rem" variant="outline" onClick={() => setIsCommentSectionShown(!isCommentSectionShown)}>Comment</Button>
        </div>
      </div>
      <Spacer height="2rem" />
      <div className={isCommentSectionShown ? 'block' : 'hidden'}>
        <Textarea placeholder="That was amazing!" minHeight="10rem" />
        <Spacer height="1rem" />
        <div className="flex flex-row justify-end w-full">
          <AnoryPrimaryButtonComponent onClick={() => console.log('implements')} text="Post Comment" />
        </div>
        <Spacer height="1rem" />
      </div>
    </div>
  );
}
