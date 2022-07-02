import EyeIcon from '../../Component/Icons/EyeIcon';
import OutlinedHeartIcon from '../../Component/Icons/OutlinedHeartIcon';
import Spacer from '../../Utilities/Spacer';

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

  return (
    <div className="p-[1.5rem] w-full bg-white rounded-lg drop-shadow-sm ">
      <p className="font-roboto text-3xl font-medium">{title}</p>
      <Spacer height="1rem" />
      <p className="font-roboto">{body}</p>
      <Spacer height="1rem" />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 stroke-[#FF4033] stroke-2">
              <OutlinedHeartIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{likeData.length}</p>
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
