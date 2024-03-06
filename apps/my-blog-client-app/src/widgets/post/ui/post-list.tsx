import { FC, Fragment, useEffect, useState } from "react";
import { PostPreview } from "@/widgets/post/ui/post-preview";
import { Post } from "@/entities/post/model/post";
import { useSearchParams } from "next/navigation";
import { fetchPosts } from "../actions/post";
import { PostNotFound } from "./post-not-found";

interface PostListProps {}

export const PostList: FC<PostListProps> = () => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<Post[]>([]);

    const category = searchParams.get("category");

    useEffect(() => {
        const fetch = async () => {
            const posts = await fetchPosts({ category });
            setPosts(posts);
        };

        fetch();
    }, [category]);

    return (
        <Fragment>
            {posts.map((post) => (
                <PostPreview key={post.id} post={post} />
            ))}
            {posts.length === 0 && <PostNotFound />}
        </Fragment>
    );
};
