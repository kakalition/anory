import StorySkeletonComponent from '../Features/Component/StorySkeletonComponent';
import StoryTileComponent from '../Features/Component/StoryTileComponent';
import String from '../Function/Helper/String';

export default class StoryTileMapper {
  static handle(entities: any[], variant: 'tile' | 'detail' = 'tile') {
    const mappedComponent = entities.map((element) => {
      if (element === null) {
        return <StorySkeletonComponent />;
      }

      return (
        <StoryTileComponent
          key={element.id}
          variant={variant}
          id={element.id}
          title={element.title}
          body={String.truncate(element.body, 100)}
          totalLikes={element.likes.length}
          totalComments={element.comments_count}
          totalViews={element.views}
          uploadedAt={(new Date(element.created_at)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        />
      );
    });

    return mappedComponent;
  }
}
