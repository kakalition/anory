import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure,
} from '@chakra-ui/react';
import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import useLike from '../../Hooks/UseLike';
import { AuthContext } from '../AuthenticationWrapper';
import Spacer from '../Utilities/Spacer';
import OutlinedHeartIcon from './Icons/OutlinedHeartIcon';
import ThreeDotsIcon from './Icons/ThreeDotsIcon';

type Params = {
  id: number,
  commenteeId: number,
  userId: string,
  postDate: string,
  comment: string,
  likeData: any[],
};

export default function CommentTileComponent(params: Params) {
  const {
    id, commenteeId, userId, postDate, comment, likeData,
  } = params;
  const user = useContext<any>(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);
  const [totalLike, isLikedByMe, onHeartClick] = useLike({ entityId: id, likeData, type: 'comments' });

  useEffect(() => {
    console.log(`${commenteeId}:${user.id}`);
  }, []);

  const menuElement = useMemo(() => {
    if (commenteeId === user.id) {
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
        <p>{comment}</p>
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
          <p className="font-light text-gray-500">{postDate}</p>
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
