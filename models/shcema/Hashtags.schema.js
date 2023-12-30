import { ObjectId } from "mongodb";


export default class Hashtag{
    constructor({_id,name,created_at}){
        this._id = _id || new ObjectId();
        this.name = name;
        this.created_at = created_at || new Date();
    }
}