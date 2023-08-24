"use client";

import data from "./appwrite/config";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Post from "./components/post";
import LoadingContext from "./context/loadingContext";

export default function Home() {
  const router = useRouter();

  const {setisLoading} = useContext(LoadingContext);

  const [loggedIn, setLoggedIn] = useState({
    status: false,
    name: null,
    id: null,
  });

  // const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");


  // function to add a new post
  const addPost = (e) => {
    e.preventDefault();
    const promise = data.databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      data.ID.unique(),
      {
        userID: loggedIn.id,
        username: loggedIn.name,
        content: content,
        likes:[] ,
      }
    );

    promise.then(
      function (response) {
        setContent("");
        setPosts([response, ...posts]);
      },
      function (error) {
        window.alert(error); 
      }
    );
  };


  //Get user details if they are authenticated
  useEffect(() => {
    getUser();
  }, []);


  const getUser = () => {
    const promise = data.account.get();
    promise.then(
      function (response) {
        setLoggedIn({ status: true, name: response.name, id: response.$id });
      }, function (error) {
          console.log(); // Failure
      });
  }

  useEffect(() => {
    setisLoading(true);
    const promise = data.databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [data.Query.orderDesc("$createdAt")]
    );

    promise.then(function (response) {
        setPosts(response.documents);
        setisLoading(false);
        // console.log(response); // Success
    }, function (error) {
        // console.log(error); // Failure
    });
  }, []);


  const logout = () => {
    const promise = data.account.deleteSession("current");
    promise.then(
      function (response) {
        setLoggedIn({ status: false, name: null, id:null });
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="font-mono bg-slate-100">
      <div className="bg-gray-800">
        <div className="max-w-2xl mx-auto flex justify-between items-center p-3">
          <h3 className="font-semibold text-xl text-gray-200">PostClub</h3>
          {loggedIn.status ? (
            <div className="flex">
              <p className="border-r pe-4 text-gray-400">Hi,{loggedIn.name}</p>
              <button
                className="text-gray-200 cursor-pointer ps-4"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-gray-200 cursor-pointer">
              Login/ Signup
            </Link>
          )}
        </div>
      </div>

     

      <div className="max-w-2xl mx-auto px-2 sm:px-0">
        
        {loggedIn.status && (
          <form onSubmit={addPost} className="sticky top-4 bg-slate-50 shadow-2xl shadow-slate-300 border-2 border-slate-300 rounded-md flex p-4 mt-4">
            <textarea
              className="grow p-3 ps-0 bg-inherit focus:outline-none resize-none overflow-y-hidden"
              rows={1}
              placeholder="How are u feeling today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-6 rounded-md disabled:cursor-not-allowed disabled:bg-slate-400 text-slate-100 bg-slate-700"
              disabled={content===""}>
              Post
            </button>
          </form>
        )}

        <div className='py-4'>
          {posts && posts.map((p)=>{
            return(
              <Post key={p.$id} post={p} currentUser={loggedIn.id}/>
            )
          })}

        </div>
      </div>
      

      
    </div>
  );
}
