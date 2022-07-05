import CommentSkeletonComponent from '../Features/Story/Components/CommentSkeletonComponent';
import CommentTileComponent from '../Features/Component/CommentTileComponent';

export default class CommentTileMapper {
  static handle(
    entity: any[],
    onAfterDelete: (() => void) | null = null,
  ) {
    const mappedComponent = entity.map((element) => {
      if (element === null) {
        return <CommentSkeletonComponent />;
      }

      return (
        <CommentTileComponent
          id={element.id}
          commenteeId={element.commentee_id}
          userId="x"
          postDate={element.created_at}
          comment={element.comment}
          likeData={element.likeData}
          onAfterDelete={onAfterDelete}
        />
      );
    });

    return mappedComponent;
  }
}
