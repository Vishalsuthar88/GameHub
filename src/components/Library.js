import React from 'react'
import {SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
const Library = () => {
  return (
    <>
      <SignedIn>
        <h2>🎮 Your Library</h2>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
export default Library      