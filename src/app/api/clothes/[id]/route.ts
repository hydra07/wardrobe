import {NextRequest, NextResponse} from "next/server";
import {deleteCloth} from "@/services/clothes.service";
import roleRequire from "@/configs/middleware";

// export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
//     // Lấy query parameters
//         c
//         return NextResponse.json(comments, {status: 200});
// }


export const DELETE = roleRequire(
    async (req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
        const userId = req.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json(
                { status: 400, message: 'User ID is required' },
                { status: 400 },
            );
        }
        const isDeleted = await deleteCloth(params.id, userId);
        if (!isDeleted) {
            console.log('Cloth not found');
            return NextResponse.json(
                { status: 400, message: 'Cloth not found' },
                { status: 400 },
            );
        }
        return NextResponse.json({ status: 200, message: 'Deleted' }, { status: 200 });
    },
    'user',
);