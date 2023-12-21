import { ObjectId } from "mongodb";
import Post from "../models/shcema/Post.shcema.js";
import databaseService from "./database.service.js";

class PostsService {
  async createPost(user_id, body) {
    const result = await databaseService.post.insertOne(
      new Post({ user_id, content: body.content })
    );
    const post = databaseService.post.findOne({
      _id: new ObjectId(result.insertedId),
    });
    return post
  }
}
const postService = new PostsService();
export default postService;
