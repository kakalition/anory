import { useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Features/AuthenticationWrapper';
import DeleteLikeDataUseCase from '../UseCases/LikeData/DeleteLikeDataUseCase';
import LikeUseCase from '../UseCases/LikeData/LikeUseCase';

type Params = {
  entityId: number,
  type: 'stories' | 'comments',
  likeData: any[]
};

export default function useLike(params: Params): [number, boolean, React.MouseEventHandler] {
  const { entityId, type, likeData } = params;

  const toast = useToast();
  const user = useContext<any>(AuthContext);
  const [totalLike, setTotalLike] = useState(likeData.length);
  const [likeByMeData, setLikeByMeData] = useState<any>(
    likeData.find((value) => value.likee_id === user.id),
  );

  const showFailedToast = (toastTitle: String) => {
    toast({
      title: toastTitle,
      containerStyle: { width: '100%' },
      duration: 2000,
      status: 'error',
    });
  };

  const likeAction = () => {
    setLikeByMeData({});
    setTotalLike(totalLike + 1);

    LikeUseCase.handle(
      { id: entityId, type },
      (response) => setLikeByMeData(response.data),
      () => {
        showFailedToast('Failed to like this story.');
        setLikeByMeData(null);
        setTotalLike(totalLike - 1);
      },
    );
  };

  const dislikeAction = (likeId: any) => {
    const temporaryLikeData = likeByMeData;
    setLikeByMeData(null);
    setTotalLike(totalLike - 1);

    DeleteLikeDataUseCase.handle(
      likeId,
      null,
      () => {
        showFailedToast('Failed to dislike this story.');
        setLikeByMeData(temporaryLikeData);
        setTotalLike(totalLike + 1);
      },
    );
  };

  const onHeartClick: React.MouseEventHandler = () => {
    const isAlreadyLike = !_.isEmpty(likeByMeData);

    if (!isAlreadyLike) likeAction();
    else dislikeAction(likeByMeData.id);
  };

  const isLikedByMe = !_.isEmpty(likeByMeData);
  return [totalLike, isLikedByMe, onHeartClick];
}
