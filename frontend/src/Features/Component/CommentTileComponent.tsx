import useLike from '../../Hooks/UseLike';
import Spacer from '../Utilities/Spacer';
import OutlinedHeartIcon from './Icons/OutlinedHeartIcon';

type Params = {
  id: number,
  userId: string,
  postDate: string,
  comment: string,
  likeData: any[],
  isInteractive: boolean
};

export default function CommentTileComponent({
  id, userId, postDate, comment, likeData,
}: Params) {
  const [totalLike, isLikedByMe, onHeartClick] = useLike({ entityId: id, likeData, type: 'comments' });

  return (
    <div className="flex flex-col p-[1.5rem] w-full font-roboto bg-white rounded-md shadow-sm">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="font-light text-gray-500">{userId}</p>
        <p className="font-light text-gray-500">{postDate}</p>
      </div>
      <Spacer height="1rem" />
      <p>{comment}</p>
      <Spacer height="1rem" />
      <div className="flex flex-row items-center">
        <button
          type="button"
          className={`w-8 h-8 ${isLikedByMe ? 'fill-[#FF4033]' : 'stroke-[#FF4033] stroke-2 fill-transparent'}`}
          onClick={onHeartClick}
        >
          <OutlinedHeartIcon />
        </button>
        <Spacer width="0.7rem" />
        <p className="pt-[0.1rem] font-roboto text-lg">{`${totalLike}`}</p>
      </div>
    </div>
  );
}
