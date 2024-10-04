import Post from "@/models/post.model";

async function getPost(
    options?:any,
    skip?: number,
    take?: number,
): Promise<InstanceType<typeof Post>[]> {
    let query = Post.find();
    if (options?.userId) {
        query = query.where('userId', options.userId);
    }
    // if (options?.tags) {
    //     const tags = await Tag.find({ name: { $in: options.tags.split(',') } });
    //     const tagIds = tags.map((tag) => tag._id);
    //     query = query.where('tags').in(tagIds);
    // }
    if (options?.brand) {
        query = query
            .where('brand', options.brand)
            .sort({ createdAt: -1 });
    }
    if (options?.title) {
        query = query
            .where('title', new RegExp(options.title, 'i'))
            .sort({ createdAt: -1 });
    }
    if (skip) {
        query = query.skip(skip);
    }
    if (take) {
        query = query.limit(take);
    }
    const result = await query.populate({
        path: 'user',
        select: 'username email avatar',
        options: {
            as: 'user',
        }
    });
    return result;
}
async function addPost(
    data: any,
    userId: string,
): Promise<InstanceType<typeof Post>> {
    const post = new Post({
        userId: userId,
        title: data.title,
        image: data.image,
        content: data.content,
        createdAt: new Date(),
        comments: [],
    });
    return await post.save();
}

async function getPostById(postId: string): Promise<InstanceType<typeof Post>> {
    return await Post.findById(postId).populate({
        path: 'user',
        select: 'username email avatar',
        options: {
            as: 'user',
        }
    })
    //     .populate({
    //     path: 'comments',
    //     populate: {
    //
    //     }
    // })
        .exec();
}

export {getPost, addPost,getPostById};