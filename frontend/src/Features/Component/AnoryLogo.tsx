import Spacer from '../Utilities/Spacer';
import AnnotationIcon from './Icons/AnnotationIcon';
import '../../Stylesheets/AnoryLogo/AnoryLogo.css';

export default function AnoryLogo() {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center">
      <div id="container"><AnnotationIcon /></div>
      <Spacer width="1rem" />
      <p id="logo-text">Anory</p>
    </div>
  );
}
