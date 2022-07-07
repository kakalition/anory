import AnoryTemplateComponent from '../Component/AnoryTemplateComponent';
import CommentSectionComponent from '../Component/CommentSectionComponent';
import Spacer from '../Utilities/Spacer';
import useStoryViewModel from './UseStoryViewModel';

export default function StoryPage() {
  const {
    storyTileElement, commentsElement,
    storyId, commentsCount,
    onInitialCommentCallback, onSuccessfullCommentCallback, onFailedCommentCallback,
  } = useStoryViewModel();

  return (
    <AnoryTemplateComponent>
      <div className="flex flex-col gap-6">
        {storyTileElement}
      </div>
      <Spacer height="2rem" />
      <CommentSectionComponent
        storyId={storyId}
        commentsCount={commentsCount}
        onInitialCommentCallback={onInitialCommentCallback}
        onSuccessfullCommentCallback={onSuccessfullCommentCallback}
        onFailedCommentCallback={onFailedCommentCallback}
      />
      <div className="flex flex-col gap-6 w-full">
        {commentsElement}
      </div>
      <Spacer height="2rem" />
    </AnoryTemplateComponent>
  );
}
