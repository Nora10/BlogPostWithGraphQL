import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      content
      timestamp
      author {
        name
      }
    }
  }
`;

const PostsList = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {data?.getAllPosts?.length > 0 ? (
          data.getAllPosts.map(
            (post: {
              id: React.Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              content:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              author: {
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              };
              timestamp: string | number | Date;
            }) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>
                  By {post.author.name} on{" "}
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>
              </li>
            )
          )
        ) : (
          <h3>No posts to view!</h3>
        )}
      </ul>
    </div>
  );
};

export default PostsList;
