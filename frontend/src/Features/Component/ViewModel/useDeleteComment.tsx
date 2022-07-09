import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay, Button, useDisclosure, useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import APICallBuilder from '../../../UseCases/APICallBuilder';
import DeleteCommentUseCase from '../../../UseCases/Comment/DeleteCommentUseCase';
import Spacer from '../../Utilities/Spacer';

export default function useDeleteComment() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const [id, setId] = useState<number>(-1);
  const [onAfterDelete, setOnAfterDelete] = useState<any>(null);

  const openDeleteDialog = (
    commentId: number,
    afterDeleteCallback?: () => void,
  ): React.MouseEventHandler => () => {
    setId(commentId);
    setOnAfterDelete(afterDeleteCallback);
    onOpen();
  };

  const onDeleteClick: React.MouseEventHandler = () => {
    console.log(id);
    const onDeleteCommentSuccess = () => {
      onClose();
      toast({
        title: 'Delete Successful.',
        position: 'top',
        status: 'success',
      });
      onAfterDelete?.();
      setId(-1);
      setOnAfterDelete(null);
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
      .addPayload({ id })
      .addOnSuccess(onDeleteCommentSuccess)
      .addOnFailed(onDeleteCommentFailed);

    deleteCommentAPI.call();
  };

  const dialogElement = (
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
  );

  return {
    openDeleteDialog,
    dialogElement,
  };
}
