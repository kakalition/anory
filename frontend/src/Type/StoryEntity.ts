import LikeDataEntity from './LikeDataEntity';

type StoryEntity = {
  id: number,
  authorId: number,
  category: string,
  views: number,
  likes: LikeDataEntity[],
  commentsCount: number,
  title: string,
  body: string,
  createdAt: string
};

export default StoryEntity;
