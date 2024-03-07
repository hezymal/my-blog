export interface PostEntity {
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}
