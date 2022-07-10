import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { curry } from 'ramda';
import _ from 'lodash';
import NewApiCallBuilder from '../../../UseCases/NewAPICallBuilder';
import Spacer from '../../Utilities/Spacer';

const baseUseDeleteEntity = (type: 'story' | 'comment', id: number, onAfterDelete: (() => void)) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const apiResource = type === 'story' ? 'stories' : 'comments';

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
      title: `Failed to delete ${type}.`,
      position: 'top',
      status: 'error',
    });
  };

  const deleteStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/${apiResource}/${id}`)
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
            {`Delete ${_.capitalize(type)}`}
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
};

const useDeleteEntity = curry(baseUseDeleteEntity);

export const useDeleteStory = useDeleteEntity('story');
export const useDeleteComment = useDeleteEntity('comment');
