import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";

export interface UserInterface {
	id: number;
	user_id: string;
	username?: string;
	created_at: string;
}

// Layout component that wraps the Header and renders child routes
function ProtectedLayout() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === false) {
			return navigate("/login"); // Redirect to login if not authenticated
			// Don't render anything until the redirect happens
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="text-center min-h-screen h-screen grid grid-rows-[1fr_99fr] grid-cols-1  !items-center justify-center gap-0">
			<Header></Header>
			<div className="!h-full overflow-y-hidden !bg-yellow-100/75 !flex !flex-1">
				<div className="  h-full mx-auto !flex !justify-center py-1 w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default ProtectedLayout;
