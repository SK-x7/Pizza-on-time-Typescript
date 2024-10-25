import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './UiComponents/Home';
import Cart from './features/cart/components/Cart';
import Menu, { fetchMenuFromApi } from './features/menu/components/Menu';

// Create the router with routes and loaders
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,  // Wrap the entire app with Header
    children: [
      {
        path: '/',
        element: <Home />,
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
