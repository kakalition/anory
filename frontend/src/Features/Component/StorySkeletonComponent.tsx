import { Skeleton, SkeletonText } from '@chakra-ui/react';
import Spacer from '../Utilities/Spacer';

export default function StorySkeletonComponent() {
  return (
    <div className="p-[1.5rem] w-full bg-white rounded-lg drop-shadow-sm">
      <Skeleton height="2rem" />
      <Spacer height="1rem" />
      <SkeletonText noOfLines={4} />
      <Spacer height="1rem" />
      <SkeletonText noOfLines={1} />
    </div>
  );
}
