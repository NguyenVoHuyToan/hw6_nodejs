import { ObjectId } from "mongodb";
import Post from "../models/shcema/Post.shcema.js";
import databaseService from "./database.service.js";
import Hashtag from "../models/shcema/Hashtags.schema.js";

class PostsService {
  async validateAndCreateHashtags(hashtags) {
    const hashtagsDoc = await Promise.all(
      hashtags.map((hashtag) =>
        databaseService.hashtags.findOneAndUpdate(
          {
            name: hashtag,
          },
          {
            $setOnInsert: new Hashtag({ name: hashtag }),
          },
          {
            upsert: true,
            returnDocument: "after",
          },
        )
      )
    );
    const hashtagId = hashtagsDoc.map((hashtag) => hashtag._id);
    console.log(hashtagId);
    return hashtagId;
  }
  async createPost(user_id, body) {
    const hashtags = await this.validateAndCreateHashtags(body.hashtags);
    const result = await databaseService.post.insertOne(
      new Post({ user_id, content: body.content, hashtags })
    );
    const post = databaseService.post.findOne({
      _id: new ObjectId(result.insertedId),
    });
    return post;
  }
}
const postService = new PostsService();
export default postService;
