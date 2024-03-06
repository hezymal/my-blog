import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PostCategory } from "@/entities/post/model/post";
import { Menu, MenuItem } from "@/shared/ui/menu";
import { fetchPostsCategories } from "../actions/post";

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
