import {NextRequest, NextResponse} from "next/server";
import roleRequire from "@/configs/middleware";
import {addComment} from "@/services/comment.service";

export const POST = roleRequire(async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (userId === null) {
        throw new Error('User ID is required');
    }
    const {content, postId,commentId} = await req.json();
    // const post = await addPost({title, image, content}, userId);
    const comment = await addComment({content, postId,commentId}, userId);
    return NextResponse.json(comment, {status: 200});
}, 'user');