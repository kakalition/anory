import StorySkeletonComponent from '../../Features/Component/StorySkeletonComponent';
import StoryTileComponent from '../../Features/Component/StoryTileComponent';
import StoryEntity from '../../Type/StoryEntity';

namespace StoryComponentMapper {
  export const single = (
    userId: number,
    entity: StoryEntity | null,
    onAfterDelete?: () => void,
  ) => {
    if (entity === null) return <StorySkeletonComponent key={Math.random()} />;
    return (
      <StoryTileComponent
        key={entity.id}
        userId={userId}
        storyEntity={entity}
        type="detail"
        onAfterDelete={onAfterDelete}
      />
    );
  };

  export const array = (
    userId: number,
    entities: (StoryEntity | null)[],
    onAfterDelete?: () => void,
  ) => {
    const mappedComponent = entities.map((element) => {
      if (element === null) return <StorySkeletonComponent key={Math.random()} />;
      return (
        <StoryTileComponent
          key={element.id}
          userId={userId}
          storyEntity={element}
          type="brief"
          onAfterDelete={onAfterDelete}
        />
      );
    });

    return mappedComponent;
  };
}

export default StoryComponentMapper;
