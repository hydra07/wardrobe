import roleRequire from "@/configs/middleware";
import {NextRequest,NextResponse} from "next/server";
import {addPost, getPost} from "@/services/post.service";
export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const {searchParams} = new URL(req.url);
    const take = Number(searchParams.get('take'));
    const skip = Number(searchParams.get('skip'));

    if (isNaN(take) || isNaN(skip)) {
        return NextResponse.json({status: 400, message: 'Take and Skip must be numbers'}, {status: 400});
    }
    const posts = await getPost( null, skip, take);
    return NextResponse.json({status: 200, post: posts}, {status: 200});
}

export const POST = roleRequire(async (req: NextRequest): Promise<NextResponse> => {
    const userId = req.headers.get('x-user-id');
    if (userId === null) {
        throw new Error('User ID is required');
    }
    const {title, image, content} = await req.json();
    const post = await addPost({title, image, content}, userId);
    return NextResponse.json({status: 200, userId: userId, post: post});
}, 'user');