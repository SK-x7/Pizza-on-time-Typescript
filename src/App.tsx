// import { createBrowserRouter, RouterProvider} from 'react-router-dom';
// import Layout from './Layout';
// import Home from './UiComponents/Home';
// import Error from './UiComponents/Error';
// import Cart from './features/cart/components/Cart';
// import Menu, { fetchMenuFromApi } from './features/menu/components/Menu';
// import CreateOrder from './features/order/components/CreateOrder'
// import Order from './features/order/components/Order'
// import {loader as orderLoader}  from './features/order/components/Order'
// import {action as signUpAction}  from './features/users/SignUp'
// import {action as loginAction}  from './features/users/LogIn'
// import Login from './features/users/LogIn';
// import SignUp from './features/users/SignUp';
// import MyOrders from './features/order/components/MyOrders';
// import { UiProvider } from './contexts/UiContexts';
// import AuthLayout from './UiComponents/AuthLayout';
// import ProtectedLayout from './UiComponents/ProtectedLayout';

// // Create the router with routes and loaders
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,  // Wrap the entire app with Header
//     children: [
//       {
//         // path: '/',
//         element: <AuthLayout />,
//         errorElement:<Error></Error>,
//         children:[
//           // {
//           //   path: '/',
//           //   element: <Home />,
//           // },
//           {
//             path:'/login',
//             element:<Login></Login>,
//             errorElement:<Error></Error>,
//             action:loginAction
//           },{
//             path:'/signup',
//             element:<SignUp></SignUp>,   
//             action:signUpAction
//           }
//         ]
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: fetchMenuFromApi,  // Loader for the Menu component
//       },
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         element:<ProtectedLayout></ProtectedLayout>,
//         errorElement:<Error></Error>,
//         children:[
//           {
//             path: '/cart',
//             element: 
//             // <ProtectedRoute>
//             <Cart/>
//             //  </ProtectedRoute>,
//           },
//           {
//             path:'/order/new',
//             element:
//             // <ProtectedRoute>
//             // {/* </ProtectedRoute>, */}
//             <CreateOrder/>
//           },
//           {
//             path:'/order/:orderId',
//             element:
//             // <ProtectedRoute>
//             <Order/>,
//             //  </ProtectedRoute>,
//             loader:orderLoader,
//             errorElement:<Error></Error>,
//           },
//           {
//             path:"/me/orders",
//             element:
//             // <ProtectedRoute>
//             <MyOrders/>
//             // {/* </ProtectedRoute> */}
              
//             // <MyOrders/>,
//             ,errorElement:<Error></Error>,
//           }
//         ]
//       }
//     ],
//   },
// ]);

// function App() {
//   return (
//     // <div className="">
//     <UiProvider>
//       <RouterProvider router={router} />
//     </UiProvider>
//     // </div>
//   );
// }

// export default App;
import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
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
import MyOrders from './features/order/components/MyOrders';
import { UiProvider } from './contexts/UiContexts';
import AuthLayout from './UiComponents/AuthLayout';
import ProtectedLayout from './UiComponents/ProtectedLayout';
import PublicLayout from './UiComponents/PublicLayout';
import MenuPage from './UiComponents/MenuPage';

// Create the router with routes and loaders
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,  // Wrap the entire app with Header
    children: [
      {
        // path: '/',
        element: <AuthLayout />,
        errorElement:<Error></Error>,
        children:[
          // {
          //   path: '/',
          //   element: <Home />,
          // },
          {
            path:'/login',
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
        // path: '/',
        element: <PublicLayout />,
        errorElement:<Error></Error>,
        children:[
          
          {
            path: '/menu',
            element: <MenuPage />,
            loader: fetchMenuFromApi,  // Loader for the Menu component
          },
          {
            path: '/',
            element: <Home />,
          },
        ]
      },
      {
        element:<ProtectedLayout></ProtectedLayout>,
        errorElement:<Error></Error>,
        children:[
          {
            path: '/cart',
            element: 
            // <ProtectedRoute>
            <Cart/>
            //  </ProtectedRoute>,
          },
          {
            path:'/order/new',
            element:
            // <ProtectedRoute>
            // {/* </ProtectedRoute>, */}
            <CreateOrder/>
          },
          {
            path:'/order/:orderId',
            element:
            // <ProtectedRoute>
            <Order/>,
            //  </ProtectedRoute>,
            loader:orderLoader,
            errorElement:<Error></Error>,
          },
          {
            path:"/me/orders",
            element:
            // <ProtectedRoute>
            <MyOrders/>
            // {/* </ProtectedRoute> */}
              
            // <MyOrders/>,
            ,errorElement:<Error></Error>,
          }
        ]
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

