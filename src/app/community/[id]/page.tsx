import Post from '../components/DemoPost';
import Comment from './Comment';
export default async function PostDetails({ params }: { params: { id: string } }) {
    return (
        <>
            <Post id={params.id}>
                <Comment id={params.id} />
            </Post>
        </>
    );
};