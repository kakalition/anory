import {
  IconButton, Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { curry } from 'ramda';
import React from 'react';
import ThreeDotsIcon from '../../Features/Component/Icons/ThreeDotsIcon';

namespace EntityMenuFactory {
  const base = (menuItems: React.ReactNode, userId: number, commenteeId: number) => {
    if (commenteeId === userId) {
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Comment options"
            icon={<ThreeDotsIcon />}
            variant="outline"
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList>
            {menuItems}
          </MenuList>
        </Menu>
      );
    }
    return <div />;
  };

  /**
 * entityMenuFactory :: React.ReactNode -> (userId -> (commenteeId -> React.ReactNode))
 */
  export const entityMenuFactory = curry(base);

  /**
  * createEntityMenu :: (React.MouseEventHandler, React.ReactNode) ->
  * (userId -> (commenteeId -> React.ReactNode))
  */
  export const createEntityMenu = (
    onEditCallback: () => void,
    onDeleteCallback: () => void,
  ) => {
    const menuItems = (
      <>
        <MenuItem onClick={onEditCallback}>Edit</MenuItem>
        <MenuItem onClick={onDeleteCallback}>Delete</MenuItem>
      </>
    );

    return entityMenuFactory(menuItems);
  };
}

export default EntityMenuFactory;
