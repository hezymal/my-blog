import { FC } from "react";
import { Post } from "@/entities/post/model/post";
import { AddCommentButton } from "@/features/post/ui/add-comment-button";
import { LikeButton } from "@/features/post/ui/like-button";
import { NumberOfViews } from "@/features/post/ui/number-of-views";
import { ButtonGroup } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Grid, GridCell } from "@/shared/ui/grid";
import { ImageBox } from "@/shared/ui/image-box";
import { TextBox } from "@/shared/ui/text-box";

interface PostPreviewProps {
    post: Post;
}

export const PostPreview: FC<PostPreviewProps> = ({ post }) => {
    return (
        <Card>
            <CardHeader>{post.createDate.toDateString()}</CardHeader>
            <CardContent>
                <TextBox noMargin>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </TextBox>
                <ImageBox url={post.coverUrl} />
            </CardContent>
            <CardFooter>
                <Grid>
                    <GridCell size={6}>
                        <ButtonGroup>
                            <LikeButton
                                numberOfLikes={post.numberOfLikes}
                                isLiked={post.isLiked}
                                onClick={() => {}}
                            />
                            <AddCommentButton
                                numberOfComments={post.numberOfComments}
                                onClick={() => {}}
                            />
                        </ButtonGroup>
                    </GridCell>
                    <GridCell size={6} align="right" valign="center">
                        <NumberOfViews numberOfViews={post.numberOfViews} />
                    </GridCell>
                </Grid>
            </CardFooter>
        </Card>
    );
};
