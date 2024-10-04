import {NextRequest, NextResponse} from "next/server";
import {getCommentsByPostId} from "@/services/comment.service";
// import {getPostById} from "@/services/post.service";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
    // Lấy query parameters
    const comments = await getCommentsByPostId(params.id);
    return NextResponse.json(comments, {status: 200});
}

