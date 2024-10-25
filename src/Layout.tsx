import { Outlet } from 'react-router-dom';
import CartOverview from './features/cart/components/CartOverview';
import Header from './UiComponents/Header';

// Layout component that wraps the Header and renders child routes
function Layout() {
  return (
    <div className='h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />
       <div className='overflow-scroll'>
        
      <main className='max-w-3xl mx-auto '>
        <Outlet /> {/* This is where child routes (like Home or Menu) will be rendered */}
      </main>
       </div>
       <CartOverview></CartOverview>
    </div>
  );
}

export default Layout;
