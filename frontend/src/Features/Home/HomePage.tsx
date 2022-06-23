import {
  Button, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import AnnotationIcon from '../Component/Icons/AnnotationIcon';
import SearchIcon from '../Component/Icons/SearchIcon';

function TopBarComponent() {
  return (
    <div className="flex flex-row justify-between items-center py-3 px-16 w-full bg-white border-b-2 border-b-gray-200">
      <div className="w-12 h-12 stroke-gray-900 stroke-[0.08rem]">
        <AnnotationIcon />
      </div>
      <InputGroup className="mx-16">
        <InputLeftElement pointerEvents="none">
          <div className="flex items-center m-2 w-full h-full stroke-gray-900 stroke-[0.08rem]">
            <SearchIcon />
          </div>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Adventure to Mount Everest"
          bg="#FAFAFA"
          focusBorderColor="#232323"
        />
      </InputGroup>
      <Button variant="outline">Logout</Button>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-[#FFFCFC]">
      <TopBarComponent />
    </div>
  );
}
