import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import NewApiCallBuilder from '../../../UseCases/NewAPICallBuilder';
import Spacer from '../../Utilities/Spacer';

export default function useDeleteComment(id: number, onAfterDelete?: () => void) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const onDeleteStorySuccess = () => {
    onClose();
    toast({
      title: 'Delete Successful.',
      position: 'top',
      status: 'success',
    });
    onAfterDelete?.();
  };

  const onDeleteStoryFailed = () => {
    onClose();
    toast({
      title: 'Failed to delete comment.',
      position: 'top',
      status: 'error',
    });
  };

  const deleteStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/stories/${id}`)
    .addMethod('DELETE')
    .addOnSuccess(onDeleteStorySuccess)
    .addOnFailed(onDeleteStoryFailed);

  const component = (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Delete Story
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
              onClick={() => deleteStoryAPI.call()}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return {
    openDeleteDialog: onOpen,
    deleteDialogComponent: component,
  };
}
