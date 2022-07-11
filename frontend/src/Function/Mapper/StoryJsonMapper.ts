import { map } from 'ramda';
import StoryEntity from '../../Type/StoryEntity';
import EntityJsonMapper from './EntityJsonMapper';

const storyJsonMapper = (json: any): StoryEntity => {
  const entity: StoryEntity = {
    id: json.id,
    authorId: json.author_id,
    category: {
      id: json.category.id,
      name: json.category.name,
    },
    commentsCount: json.comments_count,
    likes: map(EntityJsonMapper.likeData, json.likes),
    views: json.views,
    title: json.title,
    body: json.body,
    createdAt: json.created_at,
  };

  return entity;
};

export default storyJsonMapper;
