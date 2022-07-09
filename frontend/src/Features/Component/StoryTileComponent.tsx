import { useNavigate } from 'react-router-dom';
import StoryComponentEntity from '../../Function/ComponentEntity/StoryComponentEntity';
import EntityMenuFactory from '../../Function/ComponentFactory/EntityMenuFactory';
import StoryEntity from '../../Type/StoryEntity';
import Spacer from '../Utilities/Spacer';
import EyeIcon from './Icons/EyeIcon';
import FilledChatAltIcon from './Icons/FilledChatAltIcon';
import FilledHeartIcon from './Icons/FilledHeartIcon';
import useDeleteStory from './ViewModel/useDeleteStory';

type Params = {
  userId: number,
  storyEntity: StoryEntity,
  onAfterDelete?: () => void,
};

export default function StoryTileComponent(params: Params) {
  const { userId, storyEntity, onAfterDelete } = params;
  const entity = StoryComponentEntity.prepare(storyEntity, 'brief');
  const navigator = useNavigate();
  const { openDeleteDialog, deleteDialogComponent } = useDeleteStory(storyEntity.id, onAfterDelete);

  const onEditMenuClick = () => navigator(`/story/edit/${storyEntity.id}`);
  const onDeleteMenuClick = openDeleteDialog;
  const baseEntityMenu = EntityMenuFactory.createEntityMenu(onEditMenuClick, onDeleteMenuClick);
  const entityMenu = baseEntityMenu(userId, entity.authorId);

  const onCardClick = () => navigator(`/story/${entity.id}`);

  return (
    <div
      className="overflow-x-hidden relative w-full bg-white rounded-lg drop-shadow-sm hover:drop-shadow-md transition duration-75"
    >
      <button
        type="button"
        className="p-[1.5rem] w-full text-left bg-white rounded-lg select-none "
        onClick={onCardClick}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <p className="font-roboto text-3xl font-medium">{entity.title}</p>
        </div>
        <Spacer height="1rem" />
        <p className="font-roboto">{entity.body}</p>
        <Spacer height="1rem" />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row">
            <div className="flex flex-row items-center">
              <div className="w-8 h-8 fill-[#FF4033]">
                <FilledHeartIcon />
              </div>
              <Spacer width="0.7rem" />
              <p className="pt-[0.1rem] font-roboto text-lg">{entity.likes.length}</p>
            </div>
            <Spacer width="1rem" />
            <div className="flex flex-row items-center">
              <div className="w-8 h-8 fill-[#549DE1]">
                <FilledChatAltIcon />
              </div>
              <Spacer width="0.7rem" />
              <p className="pt-[0.1rem] font-roboto text-lg">{entity.commentsCount}</p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <div className="w-8 h-8 stroke-gray-900 stroke-2">
                <EyeIcon />
              </div>
              <Spacer width="0.7rem" />
              <p className="pt-[0.1rem] font-roboto text-lg">{entity.views}</p>
            </div>
            <Spacer width="1.5rem" />
            <p className="pt-[0.2rem]">{`Uploaded at: ${entity.createdAt}`}</p>
          </div>
        </div>
      </button>
      <div className="absolute top-4 right-4">
        {entityMenu}
        {deleteDialogComponent}
      </div>
    </div>
  );
}
