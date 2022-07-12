import { map } from 'ramda';
import CommentEntity from '../../Type/CommentEntity';
import EntityJsonMapper from './EntityJsonMapper';

const commentJsonMapper = (json: any) => {
  const entity: CommentEntity = {
    id: json.id,
    commenteeId: json.commentee_id,
    comment: json.comment,
    likeData: map(EntityJsonMapper.likeData, json.likeData),
    createdAt: json.created_at,
  };

  return entity;
};

export default commentJsonMapper;
