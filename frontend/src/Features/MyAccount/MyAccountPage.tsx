import { Link } from 'react-router-dom';
import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';
import Spacer from '../Utilities/Spacer';
import useMyAccountViewModel from './MyAccountViewModel';

const dummyUserData = {
  unique_id: '213n12kjn3kj12b3khb12b',
  email: 'josephjoestar@gmail.com',
  password: '********',
};

export default function MyAccountPage() {
  const { storiesElement, commentsElement } = useMyAccountViewModel();

  return (
    <AnoryTemplateComponent>
      <Spacer height="4rem" />
      <h1 className="font-raleway text-6xl text-black">My Account</h1>
      <Spacer height="2rem" />
      <h2 className="font-roboto text-3xl text-black">Profile Detail</h2>
      <Spacer height="1rem" />
      <p className="mb-1 font-roboto text-gray-900">
        {`Unique ID: ${dummyUserData.unique_id}`}
      </p>
      <div className="flex flex-row items-center mb-1">
        <p className="mr-4 mb-1 font-roboto text-gray-900">
          {`Email address: ${dummyUserData.email}`}
        </p>
        <Link to="http://" className="text-blue-700 underline">Change</Link>
      </div>
      <div className="flex flex-row items-center mb-1">
        <p className="mr-4 font-roboto text-gray-900">
          {`Password: ${dummyUserData.password}`}
        </p>
        <Link to="http://" className="text-blue-700 underline">Change</Link>
      </div>

      <Spacer height="2rem" />
      <div className="flex flex-row justify-between items-center mb-6 w-full">
        <h2 className="font-roboto text-3xl text-black">Recent Stories</h2>
        <Link to="http://" className="text-blue-700 underline">See All</Link>
      </div>
      <div className="flex flex-col gap-6">
        {storiesElement}
      </div>
      <Spacer height="1rem" />

      <Spacer height="2rem" />
      <div className="flex flex-row justify-between items-center mb-6 w-full">
        <h2 className="font-roboto text-3xl text-black">Recent Comments</h2>
        <Link to="http://" className="text-blue-700 underline">See All</Link>
      </div>
      <div className="flex flex-col gap-6">
        {commentsElement}
      </div>
      <Spacer height="1rem" />
    </AnoryTemplateComponent>
  );
}
