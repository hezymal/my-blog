import { FC, FormEventHandler, Fragment, useState } from "react";
import { NewPost } from "@client-app/entities/post/model/post";
import { CreatePostButton } from "@client-app/features/post/ui/create-post-button";
import { Button, ButtonGroup } from "@client-app/shared/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@client-app/shared/ui/card";
import { Form, FormField } from "@client-app/shared/ui/form";
import { Modal } from "@client-app/shared/ui/modal";
import { TextInput } from "@client-app/shared/ui/text-input";
import { addPost } from "@client-app/entities/post/actions/post";

export const PostCreationModal: FC = () => {
    const [show, setShow] = useState(false);
    const [post, setPost] = useState<NewPost>({
        title: "",
        coverUrl: "",
        description: "",
        categoryName: "",
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        await addPost(post);
        setShow(false);
    };

    const handleTitleChange = (title: string) => {
        setPost((p) => ({ ...p, title }));
    };

    const handleCoverUrlChange = (coverUrl: string) => {
        setPost((p) => ({ ...p, coverUrl }));
    };

    const handleDescriptionChange = (description: string) => {
        setPost((p) => ({ ...p, description }));
    };

    const handleCategoryNameChange = (categoryName: string) => {
        setPost((p) => ({ ...p, categoryName }));
    };

    const handleOpen = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Fragment>
            <CreatePostButton onClick={handleOpen} />
            <Modal show={show} onClose={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>Create Post</CardHeader>
                        <CardContent>
                            <FormField label="Title:">
                                <TextInput
                                    value={post.title}
                                    onChange={handleTitleChange}
                                />
                            </FormField>
                            <FormField label="Cover URL:">
                                <TextInput
                                    value={post.coverUrl}
                                    onChange={handleCoverUrlChange}
                                />
                            </FormField>
                            <FormField label="Description:">
                                <TextInput
                                    value={post.description}
                                    onChange={handleDescriptionChange}
                                />
                            </FormField>
                            <FormField label="Category Name:">
                                <TextInput
                                    value={post.categoryName}
                                    onChange={handleCategoryNameChange}
                                />
                            </FormField>
                        </CardContent>
                        <CardFooter>
                            <ButtonGroup>
                                <Button color="primary" type="submit">
                                    Create
                                </Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Form>
            </Modal>
        </Fragment>
    );
};
