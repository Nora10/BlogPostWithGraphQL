const resolvers = {
    Query: {
      getAllPosts: async () => {
        return await Post.find(); // Fetch all posts from the database (Post is a model)
      },
      getPost: async (_, { id }) => {
        return await Post.findById(id); // Fetch a single post by ID
      },
    },
  
    Mutation: {
      addPost: async (_, { title, content, authorId, externalLinks, images }) => {
        const post = new Post({
          title,
          content,
          author: authorId, // The authorId comes from the mutation arguments
          timestamp: new Date().toISOString(),
          externalLinks,
          images,
        });
        await post.save(); // Save the new post to the database
        return post; // Return the saved post
      },
  
      updatePost: async (_, { id, title, content, externalLinks, images }) => {
        const post = await Post.findById(id);
        if (!post) throw new Error('Post not found');
        
        // Only allow the author to update their own post
        if (post.author.toString() !== authorId) throw new Error('Not authorized to update this post');
        
        post.title = title || post.title;
        post.content = content || post.content;
        post.externalLinks = externalLinks || post.externalLinks;
        post.images = images || post.images;
  
        await post.save(); // Save the updated post
        return post; // Return the updated post
      },
  
      deletePost: async (_, { id }) => {
        const post = await Post.findById(id);
        if (!post) throw new Error('Post not found');
        
        // Only allow the author to delete their own post
        if (post.author.toString() !== authorId) throw new Error('Not authorized to delete this post');
        
        await post.remove(); // Delete the post from the database
        return post; // Return the deleted post
      },
    },
  };
  