import {
  Divider, Select, Skeleton, Textarea,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import commentJsonMapper from '../../Function/Mapper/CommentJSONMapper';
import APICallBuilder from '../../UseCases/APICallBuilder';
import { PostCommentPayload } from '../../UseCases/Comment/Payload/PostCommentPayload';
import PostCommentUseCase from '../../UseCases/Comment/PostCommentUseCase';
import Spacer from '../Utilities/Spacer';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';

type Params = {
  storyId: number,
  commentsCount: number | undefined,
  onInitialCommentCallback: () => void,
  onSuccessfullCommentCallback: (data: any) => void,
  onFailedCommentCallback: (message: any) => void,
};

export default function CommentSectionComponent(params: Params) {
  const {
    onInitialCommentCallback, onSuccessfullCommentCallback, onFailedCommentCallback,
    storyId, commentsCount,
  } = params;

  const onPostCommentSuccess = (response: AxiosResponse) => {
    onSuccessfullCommentCallback(commentJsonMapper(response.data));
    (document.getElementById('comment') as HTMLTextAreaElement).value = '';
  };

  const onPostCommentFailed = (error: any) => {
    onFailedCommentCallback(error.response.data.comment[0]);
  };

  const postCommentAPI = new APICallBuilder()
    .addAction(PostCommentUseCase.create())
    .addOnSuccess(onPostCommentSuccess)
    .addOnFailed(onPostCommentFailed);

  const onPostCommentClick: React.MouseEventHandler = () => {
    onInitialCommentCallback();
    const payload: PostCommentPayload = {
      storyId,
      comment: (document.getElementById('comment') as HTMLTextAreaElement).value,
    };

    postCommentAPI
      .addPayload(payload)
      .call();
  };

  const commentsCountElement = useMemo(() => {
    if (commentsCount === undefined) {
      return <Skeleton height="50%" width="3rem" />;
    }

    return (
      <p className="font-roboto text-3xl text-gray-500">
        {`| ${commentsCount}`}
      </p>
    );
  }, [commentsCount]);

  return (
    <div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center">
          <p className="font-roboto text-3xl text-black ">Comments</p>
          <Spacer width="1rem" />
          {commentsCountElement}
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
