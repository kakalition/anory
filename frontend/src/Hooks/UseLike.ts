import { useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import React, { useState } from 'react';
import LikeDataEntity from '../Type/LikeDataEntity';
import NewApiCallBuilder from '../UseCases/NewAPICallBuilder';

type Params = {
  userId: number,
  entityId: number,
  type: 'stories' | 'comments',
  likeData: LikeDataEntity[]
};

export default function useLike(params: Params): [number, boolean, React.MouseEventHandler] {
  const {
    userId, entityId, type, likeData,
  } = params;

  const toast = useToast();
  const [totalLike, setTotalLike] = useState(likeData.length);
  const [likeByMeData, setLikeByMeData] = useState<any>(
    likeData.find((value) => value.likeeId === userId),
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

  const postLikeAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/${type}/${entityId}/likedata`)
    .addMethod('POST')
    .addOnSuccess(onPostLikeSuccess)
    .addOnFailed(onPostLikeFailed);

  const onDeleteLikeSuccess = (response: AxiosResponse) => { console.log(response); };
  const onDeleteLikeFailed = (temporaryLikeData: any) => () => {
    showFailedToast('Failed to dislike this story.');
    setLikeByMeData(temporaryLikeData);
    setTotalLike(totalLike + 1);
  };

  const deleteLikeAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/likedata/${likeByMeData?.id}`)
    .addMethod('DELETE')
    .addOnSuccess(onDeleteLikeSuccess)
    .addOnFailed(onDeleteLikeFailed(likeByMeData));

  const likeAction = () => {
    setLikeByMeData({});
    setTotalLike(totalLike + 1);

    postLikeAPI.call();
  };

  const dislikeAction = () => {
    setLikeByMeData(null);
    setTotalLike(totalLike - 1);

    deleteLikeAPI.call();
  };

  const onHeartClick: React.MouseEventHandler = () => {
    const isAlreadyLike = !_.isEmpty(likeByMeData);

    if (!isAlreadyLike) likeAction();
    else dislikeAction();
  };

  const isLikedByMe = !_.isEmpty(likeByMeData);
  return [totalLike, isLikedByMe, onHeartClick];
}
