'use client';
import { useState } from 'react'

import LoadingContext from "./context/loadingContext";
import LoadingSpinner from './components/loadingSpinner';

export function Providers({ children }) {
    

    const [isLoading, setisLoading] = useState(false);
  return (
      <LoadingContext.Provider value={{isLoading, setisLoading}}>
        {children}
        <LoadingSpinner/>
        </LoadingContext.Provider>
  );
}