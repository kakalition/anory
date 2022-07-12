import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Spacer from '../Utilities/Spacer';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';
import SideNavBarComponent from './SideNavBarComponent';
import TopBarComponent from './TopBarComponent';

type Params = {
  children?: React.ReactNode
};

export default function AnoryTemplateComponent(params: Params) {
  const { children } = params;
  const [activeTab, setActiveTab] = useState('alls');

  return (
    <div className="flex overflow-hidden flex-col w-screen h-screen bg-[#FFFCFC]">
      <div className="w-full h-[8%]">
        <TopBarComponent />
      </div>
      <div className="flex relative flex-row w-full h-[92%]">
        <div className="w-[20%] h-full">
          <SideNavBarComponent activeTab={activeTab} />
        </div>
        <div className="overflow-y-scroll pt-8 pr-16 pl-4 w-[80%]">
          {children}
        </div>
      </div>
    </div>
  );
}
