import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Library from "./components/Library";
import Home from './components/Home';
import GameDetail from './components/GameDetail';
import React from 'react';
import './App.css';
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
function App() {

  return (
    <div className="App">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn routing="path" />} />
              <Route path="/sign-up" element={<SignUp routing="path" />} />
              <Route path="/library" element={<ProtectedRoute> <Library /></ProtectedRoute>} />
              <Route path='/game-detail/:id' element={<GameDetail routing='path' />} />
            </Routes>
          </Router>
        </Provider>
      </ClerkProvider>
    </div>
  );
}

export default App;
