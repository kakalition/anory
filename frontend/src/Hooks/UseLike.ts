import { useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Features/AuthenticationWrapper';
import APICallBuilder from '../UseCases/APICallBuilder';
import DeleteLikeDataUseCase from '../UseCases/LikeData/DeleteLikeDataUseCase';
import { PostLikePayload } from '../UseCases/LikeData/Payload/PostLikePayload';
import PostLikeUseCase from '../UseCases/LikeData/PostLikeUseCase';

type Params = {
  userId: number,
  entityId: number,
  type: 'stories' | 'comments',
  likeData: any[]
};

export default function useLike(params: Params): [number, boolean, React.MouseEventHandler] {
  const {
    userId, entityId, type, likeData,
  } = params;

  const toast = useToast();
  const [totalLike, setTotalLike] = useState(likeData.length);
  const [likeByMeData, setLikeByMeData] = useState<any>(
    likeData.find((value) => value.likee_id === userId),
  );

  const showFailedToast = (toastTitle: String) => {
    toast({
      title: toastTitle,
      containerStyle: { width: '100%' },
      duration: 2000,
      status: 'error',
    });
  };

  const onPostLikeSuccess = (response: AxiosResponse) => setLikeByMeData(response.data);
  const onPostLikeFailed = () => {
    showFailedToast('Failed to like this story.');
    setLikeByMeData(null);
    setTotalLike(totalLike - 1);
  };

  const postLikeAPI = new APICallBuilder()
    .addAction(PostLikeUseCase.create())
    .addOnSuccess(onPostLikeSuccess)
    .addOnFailed(onPostLikeFailed);

  const onDeleteLikeSuccess = (response: AxiosResponse) => { console.log(response); };
  const onDeleteLikeFailed = (temporaryLikeData: any) => () => {
    showFailedToast('Failed to dislike this story.');
    setLikeByMeData(temporaryLikeData);
    setTotalLike(totalLike + 1);
  };

  const deleteLikeAPI = new APICallBuilder()
    .addAction(DeleteLikeDataUseCase.create())
    .addOnSuccess(onDeleteLikeSuccess)
    .addOnFailed(onDeleteLikeFailed(likeByMeData));

  const likeAction = () => {
    setLikeByMeData({});
    setTotalLike(totalLike + 1);

    const payload: PostLikePayload = { id: entityId, type };
    postLikeAPI
      .addPayload(payload)
      .call();
  };

  const dislikeAction = (likeId: any) => {
    setLikeByMeData(null);
    setTotalLike(totalLike - 1);

    deleteLikeAPI
      .addPayload({ id: likeId })
      .call();
  };

  const onHeartClick: React.MouseEventHandler = () => {
    const isAlreadyLike = !_.isEmpty(likeByMeData);

    if (!isAlreadyLike) likeAction();
    else dislikeAction(likeByMeData.id);
  };

  const isLikedByMe = !_.isEmpty(likeByMeData);
  return [totalLike, isLikedByMe, onHeartClick];
}
