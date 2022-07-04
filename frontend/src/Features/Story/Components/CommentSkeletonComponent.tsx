import { Skeleton, SkeletonText } from '@chakra-ui/react';
import Spacer from '../../Utilities/Spacer';

export default function CommentSkeletonComponent() {
  return (
    <div className="p-[1.5rem] w-full bg-white rounded-md shadow-sm">
      <Skeleton height="1rem" />
      <Spacer height="1rem" />
      <SkeletonText noOfLines={2} />
      <Spacer height="1rem" />
      <SkeletonText noOfLines={1} />
    </div>
  );
}
