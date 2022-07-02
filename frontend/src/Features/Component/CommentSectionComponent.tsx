import { Divider, Select, Textarea } from '@chakra-ui/react';
import PostCommentUseCase from '../../UseCases/Comment/PostCommentUseCase';
import Spacer from '../Utilities/Spacer';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';

type Params = {
  storyId: number
};

export default function CommentSectionComponent(params: Params) {
  const { storyId } = params;

  const onPostCommentClick: React.MouseEventHandler = () => {
    PostCommentUseCase.handle(
      {
        storyId,
        comment: (document.getElementById('comment') as HTMLTextAreaElement).value,
      },
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center">
          <p className="font-roboto text-3xl text-black ">Comments</p>
          <Spacer width="1rem" />
          <p className="font-roboto text-3xl text-gray-500">| 34</p>
        </div>
        <div className="flex flex-row gap-4 items-center w-1/4">
          <Select placeholder="Sort Order" height="3rem">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Select>
          <Select placeholder="Sort By" height="3rem">
            <option value="ascending">Latest</option>
            <option value="descending">Oldest</option>
          </Select>
        </div>
      </div>
      <Spacer height="2rem" />
      <div>
        <Textarea id="comment" placeholder="That was amazing!" minHeight="10rem" />
        <Spacer height="1rem" />
        <div className="flex flex-row justify-end w-full">
          <AnoryPrimaryButtonComponent onClick={onPostCommentClick} text="Post Comment" />
        </div>
        <Spacer height="2rem" />
        <Divider opacity="0.2" />
        <Spacer height="2rem" />
      </div>
    </div>
  );
}
