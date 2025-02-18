import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import Button from "../../UiComponents/Button";
// import { supabase } from '../../apis/apiRestaurant';
import { loginFormDataInterface, loginUser } from "../../apis/apiUsers";
import store from "../../store";
import { handleUserAuthentication } from "./userSlice";

function Login() {
	return (
		<div className="flex !w-full h-full justify-center">
			<div
				className="w-full min-[425px]:w-5/6 min-[500px]:w-4/5 min-[560px]:w-4/6 sm:w-4/6  items-center xl:w-3/5 2xl:w-1/2 
        pt-5 sm:pt-5 md:pt-9 pb-3  border-none flex flex-col xl:max-h-min
        gap-3 md:gap-4"
			>
				<div className=" flex flex-col gap-3 justify-start items-start w-5/6 sm:w-3/4">
					<h1 className="capitalize xl:w-full text-3xl sm:text-4xl !text-left text-green-600 font-bold xl:tracking-tighter">
						welcome to pizza-on-time co.
					</h1>
					<p className="text-left text-sm lg:text-base w-full  lg:w-3/4 text-green-600 font-semibold">
						"Craving pizza? Pizza-On-Time Co. brings fresh, hot, and delicious
						pizzas right to your door. Customize your favorite flavors and enjoy
						fast delivery with just a few clicks. Your perfect slice is just an
						order away!"
					</p>
					<hr className="font-extrabold bg-green-600 h-[3px] w-full  md:w-3/4 xl:w-full lg:max-w-sm xl:mt-2" />
				</div>

				<div className="flex flex-1 xl:!max-h-min !w-5/6 sm:!w-3/4 justify-center sm:justify-start">
					<Form
						method="POST"
						className="flex w-5/6 sm:w-3/4 md:!max-w-sm md:w-full xl:max-h-96 xl:min-h-96 px-5 ring-1 ring-green-600 flex-col justify-evenly  border rounded-xl"
					>
						<h1 className="capitalize text-lg sm:text-xl font-semibold text-green-600">
							Welcome back👋😄
						</h1>
						<div className="flex !flex-col gap-2 md:gap-3 lg:gap-4 items-start justify-center w-full text-sm sm:text-base">
							<div className="flex !flex-col items-start justify-evenly w-full">
								{/*  */}
								<label className="capitalize text-left grow py-2 w-full text-base lg:text-lg text-green-600 font-semibold">
									Enter your Email :
								</label>
								<input
									className="input grow p-2 ring-1 ring-green-400 w-full  rounded-xl"
									type="email"
									name="email"
									required
									placeholder="Enter your email"
								/>
							</div>
							<div className="flex !flex-col gap-1 items-start justify-center w-full">
								<label className="capitalize text-left grow py-2  w-full  rounded-xl text-green-600 text-base lg:text-lg font-semibold">
									Enter your password :
								</label>
								<input
									className="input  grow p-2 ring-1 ring-green-400 w-full  rounded-xl"
									type="password"
									name="password"
									required
									placeholder="Enter Password"
								/>
							</div>
						</div>

						<Button type="small">Log-in now</Button>
						<div className=" mt-0 flex justify-center text-xs text-green-600 font-semibold">
							<Link to="/signup" className="underline underline-offset-2">
								Don't have an account ?
							</Link>
						</div>
					</Form>
				</div>
			</div>

			<div
				className={`hidden min-[500px]:flex w-0 sm:w-2/6 xl:w-2/5 2xl:w-1/2 items-center justify-end`}
			>
				<img
					className="object-contain h-full"
					src="/76745d89868413.5e04311b1b5f4-removebg-preview.png"
				/>
			</div>
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const obj: loginFormDataInterface = {
		email: data.email as string,
		password: data.password as string,
	};
	const loginSuccessful = await loginUser(obj);
	if (loginSuccessful === true) {
		store.dispatch(handleUserAuthentication());
		return redirect("/menu");
	} else {
		return;
	}
}

export default Login;
