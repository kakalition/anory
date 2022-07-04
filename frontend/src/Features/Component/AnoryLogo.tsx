import Spacer from '../Utilities/Spacer';
import AnnotationIcon from './Icons/AnnotationIcon';

export default function AnoryLogo() {
  return (
    <div className="flex flex-row items-center">
      <div className="w-10 h-10 stroke-gray-900 stroke-[0.09rem]"><AnnotationIcon /></div>
      <Spacer width="0.8rem" />
      <p className="font-raleway text-3xl font-semibold text-black">Anory</p>
    </div>
  );
}
