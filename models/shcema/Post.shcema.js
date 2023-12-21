import { ObjectId } from "mongodb";

export default class Post {
    constructor({user_id,content, hashtag, creates_at,}){
        this._id = new ObjectId();
        this.user_id = user_id,
        this.content = content,
        this.hashtag = hashtag || [],
        this.creates_at = creates_at || new Date()
    }
}