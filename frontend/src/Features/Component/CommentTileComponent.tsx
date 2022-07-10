import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast,
} from '@chakra-ui/react';
import React, {
   useMemo, useRef,
} from 'react';
import useLike from '../../Hooks/UseLike';
import Spacer from '../Utilities/Spacer';
import OutlinedHeartIcon from './Icons/OutlinedHeartIcon';
import ThreeDotsIcon from './Icons/ThreeDotsIcon';
import DeleteCommentUseCase from '../../UseCases/Comment/DeleteCommentUseCase';
import APICallBuilder from '../../UseCases/APICallBuilder';
import CommentEntity from '../../Type/CommentEntity';

type Params = {
  userId: number,
  commentEntity: CommentEntity,
  onAfterDelete: (() => void) | undefined
};

export default function CommentTileComponent(params: Params) {
  const { userId, commentEntity, onAfterDelete = null } = params;
  console.log(commentEntity);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);
  const [totalLike, isLikedByMe, onHeartClick] = useLike({
    userId, entityId: commentEntity.id, likeData: commentEntity.likeData, type: 'comments',
  });

  const onDeleteCommentSuccess = () => {
    onClose();
    toast({
      title: 'Delete Successful.',
      position: 'top',
      status: 'success',
    });
    onAfterDelete?.();
  };

  const onDeleteCommentFailed = () => {
    onClose();
    toast({
      title: 'Failed to delete comment.',
      position: 'top',
      status: 'error',
    });
  };

  const deleteCommentAPI = new APICallBuilder()
    .addAction(DeleteCommentUseCase.create())
    .addPayload({ id: commentEntity.id })
    .addOnSuccess(onDeleteCommentSuccess)
    .addOnFailed(onDeleteCommentFailed);

  const onDeleteClick: React.MouseEventHandler = () => deleteCommentAPI.call();

  const menuElement = useMemo(() => {
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
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={onOpen}>Delete</MenuItem>
          </MenuList>
        </Menu>
      );
    }

    return <div />;
  }, []);

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Delete Comment
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Spacer width="1rem" />
              <Button
                bg="#FF6961"
                textColor="#FFFFFF"
                _hover={{ bg: '#E04D46' }}
                onClick={onDeleteClick}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
