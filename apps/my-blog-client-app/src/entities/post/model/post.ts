export interface Post {
    id: number;
    title: string;
    coverUrl: string;
    createDate: Date;
    modifiedDate: Date;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

export interface NewPost {
    title: string;
    coverUrl: string;
    description: string;
    categoryName: string;
}

export interface PostCategory {
    name: string;
    title: string;
}
