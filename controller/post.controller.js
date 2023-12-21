import postService from "../service/post.service.js";

export const createsPostController = async  (req, res, next) => {
    const {user_id}= req.decode_authorization;
    const result = await postService.createPost(user_id, req.body)
    return res.json({
        message: "Created post is successfully",
        result,
    })
}