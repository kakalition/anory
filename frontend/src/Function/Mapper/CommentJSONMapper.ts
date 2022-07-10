import CommentEntity from '../../Type/CommentEntity';

const commentJsonMapper = (json: any) => {
  const entity: CommentEntity = {
    id: json.id,
    commenteeId: json.commentee_id,
    comment: json.comment,
    likeData: json.likeData,
    createdAt: json.created_at,
  };

  return entity;
};

export default commentJsonMapper;
