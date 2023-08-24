'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from "react";
import data from '../appwrite/config';
import LoadingContext from "../context/loadingContext";

const login = () => {
  const {setisLoading} = useContext(LoadingContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

    
  //Get user details if they are authenticated
  useEffect(() => {
    getUser();
  }, []);


  const getUser = () => {
    const promise = data.account.get();
    promise.then(
      function (response) {
        router.push("/");
      }, function (error) {
          console.log(); // Failure
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const login = (e) => {
    setisLoading(true);
    e.preventDefault();
    const promise = data.account.createEmailSession(
      formData.email,
      formData.password
    );
    
    promise.then(function (response) {
        console.log(response);
        router.push('/');
        setisLoading(false);
        
      }, function (error) {
        window.alert(error.message);
        setisLoading(false);
      });
  }

  return (
    <section className="font-mono bg-slate-100">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-slate-900"
        >
          PostClub
        </Link>
        <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-md md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center
             font-bold leading-tight tracking-tight text-slate-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none  focus:border-slate-600 sm:text-sm rounded-lg  block w-full p-2.5"
                  placeholder="Enter your registered email"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg  focus:outline-none focus:border-slate-600 block w-full p-2.5"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <button
                onClick={login}
                className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-slate-500">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
