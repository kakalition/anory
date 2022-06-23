import Spacer from '../Utilities/Spacer';
import AnnotationIcon from './Icons/AnnotationIcon';

export default function AnoryLogo() {
  return (
    <div className="flex flex-row items-center">
      <div className="w-16 h-16 stroke-gray-900 stroke-[0.1rem]"><AnnotationIcon /></div>
      <Spacer width="1rem" />
      <p className="font-raleway text-4xl font-semibold text-black">Anory</p>
    </div>
  );
}
