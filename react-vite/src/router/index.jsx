import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import ProductDetails from '../components/ProductDetails';
import AddReview from '../components/Reviews/AddReviewForm';
import DeleteReview from '../components/Reviews/DeleteReview'
import UpdateReview from '../components/Reviews/UpdateReview';
import Page404 from '../components/404';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />,
      },
      {
        path: '/reviews/add',
        element: <AddReview />,
      },
      {
        path: '/reviews/:reviewId/delete',
        element: <DeleteReview />,
      },
      {
        path: '/reviews/:reviewId/update',
        element: <UpdateReview />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: '/404',
        element: <Page404 />,
      },
      {
        path: "*",
        element: <Page404 />
      }
    ],
  },
]);