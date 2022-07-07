import EyeIcon from '../../Component/Icons/EyeIcon';
import OutlinedHeartIcon from '../../Component/Icons/OutlinedHeartIcon';
import Spacer from '../../Utilities/Spacer';
import useLike from '../../../Hooks/UseLike';

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

  const [totalLike, isLikedByMe, onHeartClick] = useLike({ entityId: id, likeData, type: 'stories' });

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
              className={`w-8 h-8 ${isLikedByMe ? 'fill-[#FF4033]' : 'stroke-[#FF4033] stroke-2 fill-transparent'}`}
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
