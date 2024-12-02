import React from "react";
import "./App.css";
import AddPostForm from "./AddPostForm";
import PostsList from "./PostsList";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <AddPostForm />
        <br />
        <br />
        <PostsList />
      </div>
    </div>
  );
}

export default App;
