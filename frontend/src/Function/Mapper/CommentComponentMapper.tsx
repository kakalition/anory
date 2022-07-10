import CommentTileComponent from '../../Features/Component/CommentTileComponent';
import CommentSkeletonComponent from '../../Features/Story/Components/CommentSkeletonComponent';
import CommentEntity from '../../Type/CommentEntity';

const commentComponentMapper = (
  userId: number,
  entities: CommentEntity[] | null[],
  onAfterDelete?: () => void,
) => {
  const mappedComponent = entities.map((element) => {
    if (element === null) return <CommentSkeletonComponent key={Math.random()} />;
    return (
      <CommentTileComponent
        key={element.id}
        userId={userId}
        commentEntity={element}
        onAfterDelete={onAfterDelete}
      />
    );
  });

  return mappedComponent;
};

export default commentComponentMapper;
