import _ from 'lodash';
import StorySkeletonComponent from '../Features/Component/StorySkeletonComponent';
import StoryTileComponent from '../Features/Component/StoryTileComponent';

export default class StoryTileMapper {
  static handle(entities: any[]) {
    const mappedComponent = entities.map((element) => {
      if (element === null) {
        return <StorySkeletonComponent />;
      }

      return (
        <StoryTileComponent
          key={element.id}
          variant="tile"
          id={element.id}
          title={element.title}
          body={_.truncate(element.body)}
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