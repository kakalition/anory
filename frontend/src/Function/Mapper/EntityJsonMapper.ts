import LikeDataEntity from '../../Type/LikeDataEntity';

namespace EntityJsonMapper {
  export const likeData = (json: any): LikeDataEntity => ({
    id: json.id,
    likeeId: json.likee_id,
    likeableId: json.likeable_id,
    likeableType: json.likeable_type,
    createdAt: json.createdAt,
  });
}

export default EntityJsonMapper;
