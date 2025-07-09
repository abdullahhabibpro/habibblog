import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Protector, Login } from './compoenets/index.js'; // Keeping 'compoenets' as requested
import AddPost from './pages/AddPost.jsx'; // Added .jsx extension
import Signup from './pages/Signup.jsx'; // Added .jsx extension
import EditPost from './pages/EditPost.jsx'; // Added .jsx extension
import Post from './pages/Post.jsx'; // Added .jsx extension
import AllPosts from './pages/AllPosts.jsx'; // Added .jsx extension

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <Protector authentication={false}>
            <Login />
          </Protector>
        ),
      },
      {
        path: '/signup',
        element: (
          <Protector authentication={false}>
            <Signup />
          </Protector>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <Protector authentication={true}>
            <AllPosts />
          </Protector>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Protector authentication={true}>
            <AddPost />
          </Protector>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protector authentication={true}>
            <EditPost />
          </Protector>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);