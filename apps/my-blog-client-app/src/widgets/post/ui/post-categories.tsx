import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { fetchPostsCategories } from "@client-app/entities/post/actions/post";
import { PostCategory } from "@client-app/entities/post/model/post";
import { Menu, MenuItem } from "@client-app/shared/ui/menu";

export const PostCategories: FC = () => {
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<PostCategory[]>([]);

    const category = searchParams.get("category");

    useEffect(() => {
        const fetch = async () => {
            const categories = await fetchPostsCategories();
            setCategories(categories);
        };

        fetch();
    }, [category]);

    return (
        <Menu>
            <MenuItem href="/blog" isActive={!category}>
                All
            </MenuItem>
            {categories.map((c) => (
                <MenuItem
                    key={c.name}
                    href={"/blog?category=" + c.name}
                    isActive={category === c.name}
                >
                    {c.title}
                </MenuItem>
            ))}
        </Menu>
    );
};
