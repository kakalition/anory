import LikeDataEntity from './LikeDataEntity';

type CommentEntity = {
  id: number,
  commenteeId: number,
  comment: string,
  likeData: LikeDataEntity[]
  createdAt: string,
};

export default CommentEntity;
