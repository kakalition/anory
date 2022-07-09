import StorySkeletonComponent from '../../Features/Component/StorySkeletonComponent';
import StoryTileComponent from '../../Features/Component/StoryTileComponent';
import StoryEntity from '../../Type/StoryEntity';
import String from '../Helper/String';

const storyComponentMapper = (userId: number, entities: StoryEntity[] | null[]) => {
  const mappedComponent = entities.map((element) => {
    if (element === null) {
      return <StorySkeletonComponent />;
    }

    return (
      <StoryTileComponent
        key={element.id}
        id={element.id}
        authorId={element.authorId}
        userId={userId}
        title={element.title}
        body={String.truncate(element.body, 100)}
        totalLikes={element.likes.length}
        totalComments={element.commentsCount}
        totalViews={element.views}
        uploadedAt={(new Date(element.createdAt)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      />
    );
  });

  return mappedComponent;
};

export default storyComponentMapper;
