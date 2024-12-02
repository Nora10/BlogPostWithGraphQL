import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String, $externalLinks: [String], $images: [String]) {
    updatePost(id: $id, title: $title, content: $content, externalLinks: $externalLinks, images: $images) {
      id
      title
      content
    }
  }
`;

interface UpdatePostFormProps {
    postId: string;
    currentTitle: string;
    currentContent: string;
    currentExternalLinks: string[];
    currentImages: string[];
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ postId, currentTitle, currentContent, currentExternalLinks, currentImages }) => {
    const [title, setTitle] = useState(currentTitle || '');
    const [content, setContent] = useState(currentContent || '');
    const [externalLinks, setExternalLinks] = useState(currentExternalLinks || []);
    const [images, setImages] = useState(currentImages || []);
    const [updatePost] = useMutation(UPDATE_POST);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImages = e.target.files ? Array.from(e.target.files).map(file => URL.createObjectURL(file)) : [];
    setImages(uploadedImages); // Store image URLs temporarily for display
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost({
      variables: { id: postId, title, content, externalLinks, images },
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Blog Post</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Updated Post Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Updated Post Content"
      />
      
      <div>
        <label>External Links (optional)</label>
        <input
          type="text"
          value={externalLinks.join(', ')}
          onChange={(e) => setExternalLinks(e.target.value.split(','))}
          placeholder="Comma separated links"
        />
      </div>

      <div>
        <label>Upload New Images (optional)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
        {images.length > 0 && (
          <div>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} width="100" height="100" />
            ))}
          </div>
        )}
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
