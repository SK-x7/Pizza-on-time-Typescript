import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    
        <div className='!bg-yellow-100/75 !w-full'>
        <Outlet/>
      </div>
)
}
