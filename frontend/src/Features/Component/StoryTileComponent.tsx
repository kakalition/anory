import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryComponentEntity from '../../Function/ComponentEntity/StoryComponentEntity';
import EntityMenuFactory from '../../Function/ComponentFactory/EntityMenuFactory';
import useLike from '../../Hooks/UseLike';
import StoryEntity from '../../Type/StoryEntity';
import { AuthContext } from '../AuthenticationWrapper';
import Spacer from '../Utilities/Spacer';
import EyeIcon from './Icons/EyeIcon';
import FilledChatAltIcon from './Icons/FilledChatAltIcon';
import OutlinedHeartIcon from './Icons/OutlinedHeartIcon';
import { useDeleteStory } from './ViewModel/useDeleteEntity';

type Params = {
  userId: number,
  storyEntity: StoryEntity,
  type: 'brief' | 'detail',
  onAfterDelete?: () => void,
};

type ButtonCardWrapperParams = {
  containerCss: string,
  onCardClick: React.MouseEventHandler
  children?: React.ReactNode,
};

function ButtonCardWrapper(params: ButtonCardWrapperParams) {
  const { containerCss, onCardClick, children } = params;

  return (
    <button
      type="button"
      className={`w-full text-left rounded-lg ${containerCss}`}
      onClick={onCardClick}
    >
      {children}
    </button>
  );
}

type TileLayoutParams = {
  type: 'brief' | 'detail',
  entity: StoryEntity,
  entityMenu: React.ReactNode,
  deleteDialogComponent: React.ReactNode,
};

function TileLayout({
  type, entity, entityMenu, deleteDialogComponent,
}: TileLayoutParams) {
  const {
    title, body, likes, commentsCount, views, createdAt,
  } = entity;

  const user = useContext<any>(AuthContext);
  const [totalLike, isLikedByMe, onHeartClick] = useLike({
    userId: user.id, entityId: entity.id, likeData: likes, type: 'stories',
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full bg-white select-none">
        <p className="font-roboto text-3xl font-medium">{title}</p>
      </div>
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
              disabled={type === 'brief'}
            >
              <OutlinedHeartIcon />
            </button>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{totalLike}</p>
          </div>
          <Spacer width="1rem" />
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 fill-[#549DE1]">
              <FilledChatAltIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{commentsCount}</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="w-8 h-8 stroke-gray-900 stroke-2">
              <EyeIcon />
            </div>
            <Spacer width="0.7rem" />
            <p className="pt-[0.1rem] font-roboto text-lg">{views}</p>
          </div>
          <Spacer width="1.5rem" />
          <p className="pt-[0.2rem]">{`Uploaded at: ${createdAt}`}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        {entityMenu}
        {deleteDialogComponent}
      </div>
    </>
  );
}

export default function StoryTileComponent(params: Params) {
  const navigator = useNavigate();

  const {
    userId, storyEntity, type, onAfterDelete = (() => null),
  } = params;

  const entity = StoryComponentEntity.prepare(storyEntity, type);

  const {
    openDeleteDialog, deleteDialogComponent,
  } = useDeleteStory(storyEntity.id, onAfterDelete);

  const onEditMenuClick = () => navigator(`/story/edit/${storyEntity.id}`);
  const baseEntityMenu = EntityMenuFactory.createEntityMenu(onEditMenuClick, openDeleteDialog);
  const entityMenu = baseEntityMenu(userId, entity.authorId);

  const onCardClick = () => navigator(`/story/${entity.id}`);

  const hoverCss = type === 'brief' ? 'hover:drop-shadow-md transition duration-75' : '';
  const containerCss = 'p-[1.5rem]';

  const displayedComponent = type === 'brief'
    ? (
      <ButtonCardWrapper containerCss={containerCss} onCardClick={onCardClick}>
        <TileLayout
          type={type}
          entity={entity}
          entityMenu={entityMenu}
          deleteDialogComponent={deleteDialogComponent}
        />
      </ButtonCardWrapper>
    )
    : (
      <TileLayout
        type={type}
        entity={entity}
        entityMenu={entityMenu}
        deleteDialogComponent={deleteDialogComponent}
      />
    );

  return (
    <div
      className={`overflow-x-hidden relative w-full bg-white rounded-lg drop-shadow-sm ${hoverCss} ${type === 'brief' ? null : containerCss}`}
    >
      {displayedComponent}
    </div>
  );
}
