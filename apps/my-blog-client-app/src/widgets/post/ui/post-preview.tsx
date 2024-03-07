import { FC } from "react";
import { Post } from "@client-app/entities/post/model/post";
import { AddCommentButton } from "@client-app/features/post/ui/add-comment-button";
import { LikeButton } from "@client-app/features/post/ui/like-button";
import { NumberOfViews } from "@client-app/features/post/ui/number-of-views";
import { ButtonGroup } from "@client-app/shared/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@client-app/shared/ui/card";
import { Grid, GridCell } from "@client-app/shared/ui/grid";
import { ImageBox } from "@client-app/shared/ui/image-box";
import { TextBox } from "@client-app/shared/ui/text-box";

interface PostPreviewProps {
    post: Post;
}

export const PostPreview: FC<PostPreviewProps> = ({ post }) => {
    return (
        <Card>
            <CardHeader>{post.createDate.toDateString()}</CardHeader>
            <CardContent>
                <TextBox>
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
                    <GridCell size={6} align="right" valign="middle">
                        <NumberOfViews numberOfViews={post.numberOfViews} />
                    </GridCell>
                </Grid>
            </CardFooter>
        </Card>
    );
};
