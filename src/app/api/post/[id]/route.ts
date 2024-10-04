import {NextRequest, NextResponse} from "next/server";
import {getPostById} from "@/services/post.service";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
    // Lấy query parameters
    const post = await getPostById(params.id);
    return NextResponse.json(post, {status: 200});
}