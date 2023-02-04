import {
  createBrowserRouter,
} from "react-router-dom";
import Home from '@/pages/home';
import User from '@/pages/user';
import BlogRead from "@/pages/blog-read";
import BlogEdit from "@/pages/blog-edit";
import CommentPage from "@/pages/comment-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
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
  }
]);