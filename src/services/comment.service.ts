import Post from "@/models/post.model";
import Comment from "@/models/comment.model";

async function getCommentsByPostId(postId: string) :Promise<InstanceType<any>[]>{
    const post = await Post.findById(postId).populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'username email avatar',
            options: {
                as: 'user',
            }
        }
       });
    // console.log(post.comments[0].user);
    if (!post) {
        throw new Error(`Post with id ${postId} not found`);
    }

    return post.comments as InstanceType<typeof Comment>[];
}

async function addComment( data: any, userId: string) :Promise<any>{
    let commentSaved;
    const comment = new Comment({
        userId: userId,
        postId: data.postId,
        content: data.content,
        parentId: data.commentId,
        createdAt: new Date(),
    });
    if (!comment.parentId) {
        await setLeftAndRightForComment(comment);
        commentSaved = await comment.save();
    } else {
        commentSaved = await setLeftAndRightForReply(comment);
    }
    const post = await Post.findById(data.postId);
    !post.comments && (post.comments = []);
    post.comments.push(commentSaved._id);
    await Post.updateOne({ _id: data.postId }, post);
    return await comment.save();
}



async function updateRight(comment: InstanceType<typeof Comment>): Promise<void> {
    if (comment.parentId) {
    comment.right = comment.right + 2;
    await updateRight(
        await Comment.find({ _id: comment.parentId }),
        // getCommentById(comment.parentId.toString()),
    );
} else {
    comment.right = comment.right + 2;
    console.log('After updating:', comment.right);
    // await this.commentRepository.save(comment);
    Comment.updateOne({ _id: comment._id }, comment);
    }
}




function getMaxRight(comments: InstanceType<typeof Comment>[]): number {
    if (comments.length === 0) {
        return 0; // or any other default value
    }
    return Math.max(...comments.map((comment) => comment.right || 0));
}

async function setLeftAndRightForComment(comment: InstanceType<typeof Comment>): Promise<void> {
    const comments = await Comment.find();
    const maxRight = getMaxRight(comments);
    comment.left = maxRight + 1;
    comment.right = maxRight + 2;
    await Comment.updateOne({ _id: comment._id }, comment);
}

async function setLeftAndRightForReply(comment: InstanceType<typeof Comment>): Promise<InstanceType<typeof Comment>> {
    const parent: InstanceType<typeof Comment> = await Comment.findById(comment.parentId);
    comment.left = parent.right;
    comment.right = parent.right + 1;
    // await this.commentRepository.save(comment);
    console.log(`parent:${parent._id} ,left :${parent.left} right: ${parent.right}`);
    // console.log(`left :${comment.left} right: ${comment.right}`);
    comment.save();
    // Comment.updateOne({_id: comment._id}, comment);
    await updateRight(parent);
    const comments = await Comment.find();
    // this.getAllComments();
    for (const _comment of comments
        .filter((_comment) => _comment.left >= comment.right)) {
        _comment.left += 2;
        _comment.right += 2;
        // await this.commentRepository.save(_comment);
        Comment.updateOne({_id: _comment._id}, _comment);
    }
    return comment;
}

export { getCommentsByPostId, addComment };