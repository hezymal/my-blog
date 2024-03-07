export interface PostEntity {
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string | null;
    description: string;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}
