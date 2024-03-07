"use server";

import { Post, PostCategory } from "@client-app/entities/post/model/post";
import { sleep } from "@client-app/shared/lib/promise";

interface FetchPostsRequest {
    category: string | null;
}

const postsCategories: PostCategory[] = [
    {
        name: "gta",
        title: "Grand Theft Auto",
    },
    {
        name: "elden-ring",
        title: "Elden Ring",
    },
    {
        name: "total-war",
        title: "Total War",
    },
];

const posts: Post[] = [
    {
        id: 1,
        coverUrl: "images/image-1.jpg",
        title: "Grand Theft Auto: Vice City - это видеоигра в жанре экшн-приключения, разработанная и выпущенная компанией Rockstar Games",
        description:
            "Игра является четвертой частью серии Grand Theft Auto и действие происходит в вымышленном городе Vice City, основанном на Майами 1980-х годов. Игроку предстоит взять на себя роль Томми Версетти, бандита, который только что вышел из тюрьмы и пытается восстановить свою власть в мире преступности.",
        createDate: new Date(),
        modifiedDate: new Date(),
        isLiked: true,
        numberOfLikes: 100,
        numberOfComments: 20,
        numberOfViews: 12334,
        categoryName: postsCategories[0].name,
    },
    {
        id: 2,
        coverUrl: "images/image-2.jpg",
        title: 'Elden Ring - это видеоигра в жанре экшн-ролевой игры, разрабатываемая совместно компанией FromSoftware и писателем Джорджем Мартином, автором серии книг "Песнь Льда и Пламени"',
        description:
            "Игра обещает сочетание характерных черт игр FromSoftware, таких как сложный геймплей, мрачная атмосфера и глубокий сюжет, с фэнтезийным миром, созданным Джорджем Мартином. Подробности о сюжете и геймплее пока остаются загадкой, но Elden Ring уже вызывает большой интерес у фанатов игр и литературы.",
        createDate: new Date(),
        modifiedDate: new Date(),
        isLiked: false,
        numberOfLikes: 20,
        numberOfComments: 5,
        numberOfViews: 1500000,
        categoryName: postsCategories[1].name,
    },
];

export const fetchPosts = async (request: FetchPostsRequest) => {
    await sleep(100);
    return request.category
        ? posts.filter((p) => p.categoryName === request.category)
        : posts;
};

export const fetchPostsCategories = async () => {
    await sleep(100);
    return postsCategories;
};
