import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import ProductDetails from '../components/ProductDetails';
import AddReviewForm from '../components/Reviews/AddReviewForm';
import UpdateReview from '../components/Reviews/UpdateReview';
import DeleteReview from '../components/Reviews/DeleteReview';
import Favorites from '../components/Favorites/Favorite';
import Page404 from '../components/404';
import CreateProduct from '../components/CreateProduct/CreateProduct';
import MyListings from '../components/MyListings';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
import SignupFormModal from '../components/SignupFormModal';
import LoginFormModal from '../components/LoginFormModal';


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
        path: '/reviews/:productId/add',
        element: <AddReviewForm />,
      },
      {
        path: '/reviews/:reviewId/delete',
        element: <DeleteReview />,
      },
      {
        path: '/reviews/:reviewId/update',
        element: <UpdateReview/>,
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/user/listings',
        element: <MyListings />
      },
      {
        path: '/user/listings/:productId',
        element: <UpdateProduct />
      },
      {
        path: "login",
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormModal />,
      },
      {
        path: '/products/new',
        element: <CreateProduct />
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