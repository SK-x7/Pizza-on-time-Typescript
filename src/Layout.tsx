import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div className="!p-0 !m-0">
			<Outlet />
		</div>
	);
}

export default Layout;
