import Spacer from '../Utilities/Spacer';
import FilledHeartIcon from './Icons/FilledHeartIcon';

type Params = {
  userId: string,
  postDate: string,
  comment: string,
  totalLikes: number
};

export default function CommentTileComponent({
  userId, postDate, comment, totalLikes,
}: Params) {
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
        <div className="w-8 h-8 fill-[#FF4033]">
          <FilledHeartIcon />
        </div>
        <Spacer width="0.7rem" />
        <p className="pt-[0.1rem] font-roboto text-lg">{totalLikes}</p>
      </div>
    </div>
  );
}
