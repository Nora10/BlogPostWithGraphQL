import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

interface DeletePostFormProps {
    postId: string;
}

const DeletePostButton: React.FC<DeletePostFormProps> = ({ postId }) => {
  const [deletePost] = useMutation(DELETE_POST);

  const handleDelete = async () => {
    await deletePost({ variables: { id: postId } });
  };

  return <button onClick={handleDelete}>Delete Post</button>;
};

export default DeletePostButton;
