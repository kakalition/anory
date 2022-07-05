import { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import _ from 'lodash';
import { AuthContext } from '../../AuthenticationWrapper';
import EyeIcon from '../../Component/Icons/EyeIcon';
import OutlinedHeartIcon from '../../Component/Icons/OutlinedHeartIcon';
import Spacer from '../../Utilities/Spacer';
import DeleteLikeDataUseCase from '../../../UseCases/LikeData/DeleteLikeDataUseCase';
import LikeUseCase from '../../../UseCases/LikeData/PostLikeUseCase';

type Params = {
  id: number,
  title: string,
  body: string,
  likeData: any[],
  totalViews: number,
  uploadedAt: string
};

export default function StoryDetailTileComponent(params: Params) {
  const {
    id, title, body, likeData, totalViews, uploadedAt,
  } = params;

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

  const likeStoryAction = () => {
    setLikeByMeData({});
    setTotalLike(totalLike + 1);

    LikeUseCase.handle(
      { id, type: 'stories' },
      (response) => setLikeByMeData(response.data),
      () => {
        showFailedToast('Failed to like this story.');
        setLikeByMeData(null);
        setTotalLike(totalLike - 1);
      },
    );
  };

  const dislikeStoryAction = (likeId: any) => {
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

    if (!isAlreadyLike) likeStoryAction();
    else dislikeStoryAction(likeByMeData.id);
  };

  return (
    <div className="p-[1.5rem] w-full bg-white rounded-lg drop-shadow-sm ">
      <p className="font-roboto text-3xl font-medium">{title}</p>
      <Spacer height="1rem" />
      <p className="font-roboto">{body}</p>
      <Spacer height="1rem" />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <button
              type="button"
              className={`w-8 h-8 ${_.isEmpty(likeByMeData) ? 'stroke-[#FF4033] stroke-2 fill-transparent' : 'fill-[#FF4033]'}`}
              onClick={onHeartClick}
            >
              <OutlinedHeartIcon />
            </button>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{totalLike}</p>
          </div>
          <Spacer width="1rem" />
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 stroke-gray-900 stroke-2">
              <EyeIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{totalViews}</p>
          </div>
          <Spacer width="1.5rem" />
          <p className="pt-[0.2rem]">{`Uploaded at: ${uploadedAt}`}</p>
        </div>
      </div>
    </div>
  );
}
