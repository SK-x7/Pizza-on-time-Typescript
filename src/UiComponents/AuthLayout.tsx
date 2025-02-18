import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { supabase } from '../apis/apiRestaurant';
import useAuth from "../hooks/useAuth";
import Header from "./Header";

export default function AuthLayout() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === true) return navigate("/menu");
	}, [isAuthenticated, navigate]);

	return (
		<div className="text-center !min-h-screen !h-screen !max-h-screen flex flex-col items-center w-full">
			<Header></Header>
			<div className="flex flex-1 w-full">
				<div className="!bg-yellow-100/75 !flex justify-center items-start flex-1 w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
