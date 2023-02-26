import Home from '@/pages/home';
import User from '@/pages/user';
import UserBlog from '@/pages/user-blog';
import BlogRead from "@/pages/blog-read";
import BlogEdit from "@/pages/blog-edit";
import CommentPage from "@/pages/comment-page";
import Lost from "@/pages/404";
import Login from '@/pages/login';
import Register from '@/pages/register';

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user-blog",
    element: <UserBlog />,
  },
  {
    path: "/blog-read",
    element: <BlogRead />,
  },
  {
    path: "/blog-edit",
    element: <BlogEdit />,
  },
  {
    path: "/comment-page",
    element: <CommentPage />,
  },
  {
    path: '*',
    element: <Lost />
  }
]