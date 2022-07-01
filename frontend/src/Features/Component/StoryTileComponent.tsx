import { useNavigate } from 'react-router-dom';
import Spacer from '../Utilities/Spacer';
import EyeIcon from './Icons/EyeIcon';
import FilledChatAltIcon from './Icons/FilledChatAltIcon';
import FilledHeartIcon from './Icons/FilledHeartIcon';

type Params = {
  id: number,
  title: string,
  body: string,
  totalLikes: number,
  totalComments: number,
  totalViews: number,
  uploadedAt: string
};

export default function StoryTileComponent({
  id, title, body, totalLikes, totalComments, totalViews, uploadedAt,
}: Params) {
  const navigator = useNavigate();

  return (
    <button
      type="button"
      className="p-[1.5rem] w-full text-left bg-white rounded-lg drop-shadow-sm hover:drop-shadow-md transition duration-75 select-none"
      onClick={() => navigator(`/story/${id}`)}
    >
      <p className="font-roboto text-3xl font-medium">{title}</p>
      <Spacer height="1rem" />
      <p className="font-roboto">{body}</p>
      <Spacer height="1rem" />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 fill-[#FF4033]">
              <FilledHeartIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{totalLikes}</p>
          </div>
          <Spacer width="1rem" />
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 fill-[#549DE1]">
              <FilledChatAltIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{totalComments}</p>
          </div>
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
    </button>
  );
}
