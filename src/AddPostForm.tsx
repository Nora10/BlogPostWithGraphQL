import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_POST = gql`
  mutation AddPost(
    $title: String!
    $content: String!
    $authorId: ID!
    $externalLinks: [String]
    $images: [String]
  ) {
    addPost(
      title: $title
      content: $content
      authorId: $authorId
      externalLinks: $externalLinks
      images: $images
    ) {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

interface AddPostMutationVariables {
  title: string;
  content: string;
  authorId: string;
  externalLinks: string[];
  images: string[];
}

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authorId] = useState<string>("userId123"); // Assume this is the logged-in user's ID
  const [externalLinks, setExternalLinks] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [addPost] = useMutation(ADD_POST);

   // Check if the required fields are filled
   const isFormValid = title.trim() !== '' && content.trim() !== '';

  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImages = e.target.files
      ? Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      : [];
      setImages((prevImages) => [...prevImages, ...uploadedImages]); // Append new images to the existing ones
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if using formData
    // const formData = new FormData();

    // formData.append('title', title);
    // formData.append('content', content);
    // if (images) {
    //   formData.append('image', images);
    // }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedExternalLinks = externalLinks.map(link => link.trim());

    // Ensure the trimmed values are passed into the mutation
    await addPost({
      variables: { 
        title: trimmedTitle, 
        content: trimmedContent, 
        authorId, 
        externalLinks: trimmedExternalLinks, 
        images 
      },
    });
    
    setTitle("");
    setContent("");
    setExternalLinks([]);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h3>Add A New Blog Post</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="form-input"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        className="form-input"
      />
      <div>
        <label>External Links (optional)</label>
        <input
          type="text"
          value={externalLinks.join(", ")}
          onChange={(e) => setExternalLinks(e.target.value.split(","))}
          placeholder="Comma separated links"
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Upload Images (optional)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="form-input"
        />
        {images.length > 0 && (
          <div className="image-previews">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                width="100"
                height="100"
              />
            ))}
          </div>
        )}
      </div>
      <button type="submit" disabled={!isFormValid} className={`submit-btn ${isFormValid ? 'active' : 'disabled'}`}>Add Post</button>
    </form>
  );
};

export default AddPostForm;
