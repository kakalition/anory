import Spacer from '../Utilities/Spacer';
import AnnotationIcon from './Icons/AnnotationIcon';

export default function AnoryLogo() {
  return (
    <div className="flex flex-row items-center">
      <div className="w-12 h-12 stroke-gray-900 stroke-[0.09rem]"><AnnotationIcon /></div>
      <Spacer width="1rem" />
      <p className="font-raleway text-3xl font-semibold text-black">Anory</p>
    </div>
  );
}
