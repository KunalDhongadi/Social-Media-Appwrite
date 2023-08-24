"use client";
import React, { useEffect, useState } from "react";
import LikeBtn from "./likeBtn";

const Post = ({ post, currentUser }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  //Check if current User has liked the post
  useEffect(() => {
    const userHasLiked = post.likes.includes(currentUser);
    if (userHasLiked) {
      setIsLiked(true);
    }
  }, []);

  //format timestamp
  function formatTimeAgo(timestamp) {
    const currentTime = new Date();
    const thenTime = new Date(timestamp);
    const timeDifference = (currentTime - thenTime) / 1000;

    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)}s ago`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)}m ago`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)}h ago`;
    } else {
      return `${Math.floor(timeDifference / 86400)}d ago`;
    }
  }

  return (
    <div className="bg-slate-50 border-2 border-slate-200 rounded-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{post.username}</h3>
        <p className="text-slate-500">{formatTimeAgo(post.$createdAt)}</p>
      </div>
      <p className="py-2">{post.content}</p>
      <div className="flex items-center">
        {currentUser && 
          <LikeBtn
            isliked={isLiked}
            post={post}
            currentUser={currentUser}
            setLikeCount={setLikeCount}
          />
        }
        {likeCount > 0 && <p className="text-slate-500">{likeCount} {!currentUser && "like(s)"}</p>}
      </div>
    </div>
  );
};

export default Post;
