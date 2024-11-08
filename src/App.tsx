import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './UiComponents/Home';
import Error from './UiComponents/Error';
import Cart from './features/cart/components/Cart';
import Menu, { fetchMenuFromApi } from './features/menu/components/Menu';
import CreateOrder from './features/order/components/CreateOrder'
import Order from './features/order/components/Order'
import {loader as orderLoader}  from './features/order/components/Order'
import {action as signUpAction}  from './features/users/SignUp'
import {action as loginAction}  from './features/users/LogIn'
import Login from './features/users/LogIn';
import SignUp from './features/users/SignUp';
import MyOrders, { fetchOrdersFromApi } from './features/order/components/MyOrders';
import { UiProvider } from './contexts/UiContexts';

// Create the router with routes and loaders
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,  // Wrap the entire app with Header
    children: [
      {
        // path: '/',
        element: <Home />,
        errorElement:<Error></Error>,
        children:[
          {
            path:'/',
            element:<Login></Login>,
            errorElement:<Error></Error>,
            action:loginAction
          },{
            path:'/signup',
            element:<SignUp></SignUp>,
            action:signUpAction
          }
        ]
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: fetchMenuFromApi,  // Loader for the Menu component
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
      {
        path:'/order/new',
        element:<CreateOrder/>,
      },
      {
        path:'/order/:orderId',
        element:<Order/>,
        loader:orderLoader,
        errorElement:<Error></Error>,
      },
      {
        path:"/me/orders",
        element:<MyOrders/>,
        loader:fetchOrdersFromApi,
      }
    ],
  },
]);

function App() {
  return (
    // <div className="">
    <UiProvider>
      
      <RouterProvider router={router} />
    </UiProvider>
    // </div>
  );
}

export default App;
