import {
  Button, FormControl, FormLabel, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, Textarea, useDisclosure, useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NewApiCallBuilder from '../../../UseCases/NewAPICallBuilder';
import Spacer from '../../Utilities/Spacer';

const useEditComment = (id: number, initialComment: string) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const [comment, setComment] = useState(initialComment);

  const onDeleteStorySuccess = () => {
    onClose();
    toast({
      title: 'Update Successful.',
      position: 'top',
      status: 'success',
    });
  };

  const onDeleteStoryFailed = (error: any) => {
    onClose();
    toast({
      title: 'Failed to update story.',
      description: error.response.data.message,
      position: 'top',
      status: 'error',
    });
  };

  const editCommentAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/comments/${id}`)
    .addMethod('PATCH')
    .addPayload({ comment })
    .addOnSuccess(onDeleteStorySuccess)
    .addOnFailed(onDeleteStoryFailed);

  const component = (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl>
              <FormLabel htmlFor="comment-form">Comment</FormLabel>
              <Textarea
                id="comment-form"
                minHeight="10rem"
                maxHeight="25rem"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Spacer width="1rem" />
          <Button
            bg="#87CEEB"
            textColor="#FFFFFF"
            _hover={{ bg: '#E04D46' }}
            onClick={() => editCommentAPI.call()}
          >
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return {
    openEditDialog: onOpen,
    editDialogComponent: component,
  };
};

export default useEditComment;
