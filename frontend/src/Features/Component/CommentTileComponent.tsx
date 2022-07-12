import {
  IconButton, Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import useLike from '../../Hooks/UseLike';
import Spacer from '../Utilities/Spacer';
import OutlinedHeartIcon from './Icons/OutlinedHeartIcon';
import ThreeDotsIcon from './Icons/ThreeDotsIcon';
import CommentEntity from '../../Type/CommentEntity';
import { useDeleteComment } from './ViewModel/useDeleteEntity';
import useEditComment from './ViewModel/useEditComment';

type Params = {
  userId: number,
  commentEntity: CommentEntity,
  onAfterDelete?: () => void,
  onAfterEdit?: () => void,
};

export default function CommentTileComponent(params: Params) {
  const {
    userId,
    commentEntity,
    onAfterDelete = () => null,
    onAfterEdit = () => null,
  } = params;

  const { openDeleteDialog, deleteDialogComponent } = useDeleteComment(
    commentEntity.id,
    onAfterDelete,
  );

  const { openEditDialog, editDialogComponent } = useEditComment(
    commentEntity.id,
    commentEntity.comment,
    onAfterEdit,
  );

  const [totalLike, isLikedByMe, onHeartClick] = useLike({
    userId, entityId: commentEntity.id, likeData: commentEntity.likeData, type: 'comments',
  });

  const generateMenuElement = () => {
    if (commentEntity.commenteeId === userId) {
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Comment options"
            icon={<ThreeDotsIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={openEditDialog}>Edit</MenuItem>
            <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
          </MenuList>
        </Menu>
      );
    }

    return <div />;
  };

  const menuElement = generateMenuElement();

  return (
    <>
      <div className="flex flex-col p-[1.5rem] w-full font-roboto bg-white rounded-md shadow-sm">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="font-light text-gray-500">{userId}</p>
          {menuElement}
        </div>
        <Spacer height="1rem" />
        <p>{commentEntity.comment}</p>
        <Spacer height="1rem" />
        <div className="flex flex-row justify-between items-center">
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
          <p className="font-light text-gray-500">{commentEntity.createdAt}</p>
        </div>
      </div>
      {deleteDialogComponent}
      {editDialogComponent}
    </>
  );
}
