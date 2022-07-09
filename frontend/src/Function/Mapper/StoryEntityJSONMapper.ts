import StoryEntity from '../../Type/StoryEntity';
import LikeDataEntity from '../../Type/LikeDataEntity';

const storyEntityJSONMapper = (json: any) => {
  const entity: StoryEntity = {
    id: json.id,
    authorId: json.author_id,
    category: json.category,
    commentsCount: json.comments_count,
    likes: json.likes.map((element: any) => ({
      id: element.id,
      likeeId: element.likee_id,
      likeableId: element.likeable_id,
      likeableType: element.likeable_type,
      createdAt: element.created_at,
    }) as LikeDataEntity),
    views: json.views,
    title: json.title,
    body: json.body,
    createdAt: json.created_at,
  };

  return entity;
};

export default storyEntityJSONMapper;
