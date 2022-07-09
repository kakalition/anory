import StorySkeletonComponent from '../../Features/Component/StorySkeletonComponent';
import StoryTileComponent from '../../Features/Component/StoryTileComponent';
import StoryEntity from '../../Type/StoryEntity';

const storyComponentMapper = (
  userId: number,
  entities: StoryEntity[] | null[],
  onAfterDelete?: () => void,
) => {
  const mappedComponent = entities.map((element) => {
    if (element === null) return <StorySkeletonComponent />;
    return (
      <StoryTileComponent userId={userId} storyEntity={element} onAfterDelete={onAfterDelete} />
    );
  });

  return mappedComponent;
};

export default storyComponentMapper;
