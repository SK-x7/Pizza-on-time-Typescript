import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './UiComponents/Home';
import Error from './UiComponents/Error';
import Cart from './features/cart/components/Cart';
import Menu, { fetchMenuFromApi } from './features/menu/components/Menu';
import CreateOrder from './features/order/components/CreateOrder'
import Order from './features/order/components/Order'
import {loader as orderLoader}  from './features/order/components/Order'
import {action as createOrderAction}  from './features/order/components/CreateOrder'
import {action as updateOrderAction}  from './features/order/components/UpdateOrder'
import {action as signUpAction}  from './features/users/SignUp'
import Login from './features/users/LogIn';
import SignUp from './features/users/SignUp';

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
        action:createOrderAction,
      },
      {
        path:'/order/:orderId',
        element:<Order/>,
        loader:orderLoader,
        errorElement:<Error></Error>,
        action:updateOrderAction
  
      },
    ],
  },
]);

function App() {
  return (
    // <div className="">
      <RouterProvider router={router} />
    // </div>
  );
}

export default App;
