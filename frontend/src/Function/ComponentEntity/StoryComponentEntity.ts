import StoryEntity from '../../Type/StoryEntity';
import String from '../Helper/String';

namespace StoryComponentEntity {
  export const prepare = (entity: StoryEntity, type: 'brief' | 'detail'): StoryEntity => {
    const createdAt = (new Date(entity.createdAt)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const description = type === 'brief' ? String.truncate(entity.body, 200) : entity.body;
    const prepared = { ...entity, createdAt, description };

    return prepared;
  };
}

export default StoryComponentEntity;
