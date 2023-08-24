'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext,useState, useEffect } from 'react';
import data from '../appwrite/config';
import LoadingContext from '../context/loadingContext';


const signup = () => {

  const router = useRouter();
  const {setisLoading} = useContext(LoadingContext);


  useEffect(() => {
    getUser();
  }, []);


  const getUser = () => {
    const promise = data.account.get();
    promise.then(
      function (response) {
        router.push("/");
      }, function (error) {
          // Failure
          console.log();
      });
  }


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  const onSignup = (e) => {
    setisLoading(true);
    e.preventDefault();
    data.account.create(
      data.ID.unique(),
      formData.email,
      formData.password,
      formData.username
    ).then(response => {
        console.log(response);
        login();
    }, function( error) {
        window.alert(error.message);
    });
  }

  const login = () => {
    const promise = data.account.createEmailSession(
      formData.email,
      formData.password
    );
    
    promise.then(function (response) {
        router.push("/");
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
      <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-md  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-slate-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-slate-900"
              >
                Your Username
              </label>
              <input
                type='text'
                name="username"
                id="username"
                className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:outline-none  focus:border-slate-600 block w-full p-2.5"
                placeholder="Create a username"
                required=""
                onChange={handleChange}
              />
            </div>
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
                className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:outline-none  focus:border-slate-600 block w-full p-2.5"
                placeholder="Enter your email"
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
                placeholder="Set a password"
                className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:outline-none  focus:border-slate-600 block w-full p-2.5"
                required=""
                onChange={handleChange}
              />
            </div>
            <button
              onClick={onSignup}
              className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Signup
            </button>
            <p className="text-sm font-light text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default signup