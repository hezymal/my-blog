import { useSearchParams } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { searchPosts } from "@client-app/entities/post/actions/post";
import { Post } from "@client-app/entities/post/model/post";
import { PostPreview } from "@client-app/widgets/post/ui/post-preview";
import { PostNotFound } from "./post-not-found";

export const PostList: FC = () => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<Post[]>([]);

    const category = searchParams.get("category");

    useEffect(() => {
        const search = async () => {
            const searchResult = await searchPosts({ category });
            if (searchResult.ok) {
                setPosts(
                    searchResult.payload.map((p) => ({
                        id: p.id,
                        title: p.title,
                        coverUrl: p.coverUrl,
                        createDate: new Date(p.createDate),
                        modifiedDate: p.modifiedDate
                            ? new Date(p.modifiedDate)
                            : null,
                        description: p.description,
                        isLiked: p.isLiked,
                        numberOfLikes: p.numberOfLikes,
                        numberOfComments: p.numberOfComments,
                        numberOfViews: p.numberOfViews,
                        categoryName: p.categoryName,
                    }))
                );
            }
        };

        search();
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
