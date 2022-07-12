import { Select, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import HtmlHelper from '../../Function/Helper/HtmlHelper';
import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';
import Spacer from '../Utilities/Spacer';
import useHomePageViewModel from './HomePageViewModel';

export default function HomePage() {
  const { storiesElement, markShouldRefetchDirty, showSpinner } = useHomePageViewModel();

  const scrollListener: EventListener = (event) => {
    const target = event.target as HTMLDivElement;
    const isAtBottom = HtmlHelper.isScrolledToBottom(0, target);

    if (isAtBottom) markShouldRefetchDirty();
  };

  useEffect(() => {
    const root = document.getElementById('anory-content') as HTMLDivElement;
    root.addEventListener('scroll', scrollListener);
    return () => root.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <AnoryTemplateComponent>
      <div className="flex flex-row gap-2 justify-between items-center">
        <Select placeholder="Sort Order" height="3rem">
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select placeholder="Sort By" height="3rem">
          <option value="views">Most Views</option>
          <option value="likes">Most Likes</option>
        </Select>
        <Select placeholder="Category" height="3rem">
          <option value="adventure">Adventure</option>
          <option value="honor">Honor Moment</option>
        </Select>
      </div>
      <Spacer height="1.5rem" />
      <div className="flex flex-col gap-6 justify-center items-center">
        {storiesElement}
        { showSpinner ? <Spinner size="lg" /> : null }
      </div>
      <Spacer height="1.5rem" />
    </AnoryTemplateComponent>
  );
}
