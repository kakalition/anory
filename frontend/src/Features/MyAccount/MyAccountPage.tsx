import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentTileMapper from '../../Mapper/CommentTileMapper';
import StoryTileMapper from '../../Mapper/StoryTileMapper';
import GetUserCommentsUseCase from '../../UseCases/Comment/GetUserCommentsUseCase';
import GetStoriesUseCase from '../../UseCases/Story/GetStoriesUseCase';
import SideNavBarComponent from '../Component/SideNavBarComponent';
import TopBarComponent from '../Component/TopBarComponent';
import Spacer from '../Utilities/Spacer';

const dummyUserData = {
  unique_id: '213n12kjn3kj12b3khb12b',
  email: 'josephjoestar@gmail.com',
  password: '********',
};

export default function MyAccountPage() {
  const [storiesData, setStoriesData] = useState([null, null, null]);
  const storiesElement = useMemo(() => StoryTileMapper.handle(storiesData), [storiesData]);

  const [commentsData, setCommentsData] = useState([null, null, null]);
  const commentsElement = useMemo(() => CommentTileMapper.handle(commentsData), [commentsData]);

  const fetchStoriesData = () => {
    GetStoriesUseCase.handle(
      3,
      null,
      (response) => setStoriesData(response.data),
    );
  };

  const fetchCommentsData = () => {
    GetUserCommentsUseCase.handle(
      (response) => setCommentsData(response.data),
    );
  };

  useEffect(() => {
    fetchStoriesData();
    fetchCommentsData();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFCFC]">
      <div className="w-full h-[8%]">
        <TopBarComponent />
      </div>
      <div className="flex relative flex-row w-full h-[92%]">
        <div className="w-[20%] h-full">
          <SideNavBarComponent activeTab="" onFABClick={() => {}} />
        </div>
        <div className="overflow-y-scroll pt-8 pr-16 pl-4 w-[80%]">
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
        </div>
      </div>
    </div>
  );
}
