import { compose, map, prop } from 'ramda';
import commentJsonMapper from '../Mapper/CommentJSONMapper';
import storyJsonMapper from '../Mapper/StoryJsonMapper';

namespace JsonHelper {

  export const mapCommentFromAxiosResponse = () => compose(
    commentJsonMapper,
    prop<string, any>('data'),
  );

  export const mapCommentsFromAxiosResponse = () => compose(
    map(commentJsonMapper),
    prop<string, any>('data'),
  );

  export const mapStoryFromAxiosResponse = () => compose(
    storyJsonMapper,
    prop<string, any>('data'),
  );

  export const mapStoriesFromAxiosResponse = () => compose(
    map(storyJsonMapper),
    prop<string, any>('data'),
  );
}

export default JsonHelper;
