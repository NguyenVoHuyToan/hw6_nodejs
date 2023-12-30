import { ObjectId } from "mongodb";

export default class Post {
    constructor({_id,user_id,content, hashtags, creates_at,}){
        this._id = _id ||new ObjectId();
        this.user_id = user_id,
        this.content = content,
        this.hashtags = hashtags || new ObjectId(),
        this.creates_at = creates_at || new Date()
    }
}