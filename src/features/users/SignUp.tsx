import { toast } from "react-hot-toast";
import { ActionFunctionArgs, Form, Link } from "react-router-dom";
import { signupFormDataInterface, signUser } from "../../apis/apiUsers";
import Button from "../../UiComponents/Button";

function SignUp() {
	return (
		<div className="flex !w-full h-full border">
			<div className="w-full sm:w-!4/6 lg:w-3/5 xl:w-1/2 items-center pt-3 sm:pt-5 xl:pt-7 pb-3  border-none flex flex-col gap-3">
				<div className=" flex flex-col gap-3 justify-start items-start w-5/6 min-[420px]:w-4/5 min-[500px]:w-3/4 min-[500px]:min-h-[30%] min-[500px]:justify-between sm:w-5/6 lg:gap-2">
					<h1 className="capitalize text-3xl sm:text-4xl !text-left text-green-600 font-bold lg:-tracking-wide">
						welcome to pizza-on-time co.
					</h1>
					<p className="text-left text-sm lg:text-base w-full min-[500px]:w-4/5 sm:w-full text-green-600 font-semibold md:max-w-sm lg:max-w-md">
						"Craving pizza? Pizza-On-Time Co. brings fresh, hot, and delicious
						pizzas right to your door. Customize your favorite flavors and enjoy
						fast delivery with just a few clicks. Your perfect slice is just an
						order away!"
					</p>
					<hr
						className="font-extrabold bg-green-600 h-[3px] w-full min-[500px]:max-w-[364px]   sm:w-full 
          md:!max-w-sm "
					/>
				</div>

				<div className="flex flex-1 xl:!max-h-min !w-5/6 min-[500px]:!w-3/4 justify-center min-[500px]:justify-start sm:!w-5/6">
					<Form
						method="POST"
						className="flex w-full min-[420px]:w-5/6 min-[500px]:max-w-[364px]  min-[500px]:min-h-[346px]  min-[500px]:w-full sm:w-full md:!max-w-sm md:w-full xl:max-h-96 xl:min-h-96 px-5 ring-1 ring-green-600 flex-col justify-evenly  border rounded-xl"
					>
						<h1 className="capitalize text-lg sm:text-xl font-semibold text-green-600 my-2">
							Create your account
						</h1>
						<div className="mb-3 sm:mb-5 flex flex-col gap-0 sm:flex-row sm:items-center text-sm lg:text-base">
							<input
								className="input grow p-2 ring-1 ring-green-400 rounded-xl"
								type="text"
								name="username"
								required
								placeholder="Enter your name"
							/>
						</div>
						<div className="mb-3 sm:mb-5 flex flex-col gap-0 sm:flex-row sm:items-center text-sm lg:text-base">
							<input
								className="input grow p-2 ring-1 ring-green-400  rounded-xl"
								type="email"
								name="email"
								required
								placeholder="Enter your email"
							/>
						</div>
						<div className="mb-3 sm:mb-5 flex flex-col gap-0 sm:flex-row sm:items-center text-sm lg:text-base">
							<input
								className="input grow p-2 ring-1 ring-green-400  rounded-xl"
								type="password"
								name="password"
								required
								placeholder="Enter Password"
							/>
						</div>
						<div className="mb-3 md:mb-5 flex flex-col gap-0 sm:flex-row sm:items-center text-sm lg:text-base">
							<input
								className="input grow p-2 ring-1 ring-green-400  rounded-xl"
								type="password"
								name="verifyPassword"
								required
								placeholder="Verify Password:Re-Enter Password"
							/>
						</div>
						<Button type="small">Sign-up now</Button>
						<div className=" mt-2 mb-1 sm:mb-0 flex justify-center text-xs text-green-600 font-semibold">
							<Link to="/login" className="underline underline-offset-2">
								Already have an account ?
							</Link>
						</div>
					</Form>
				</div>
			</div>

			<div className={`hidden sm:flex sm:w-2/5 xl:w-1/2 lg:justify-end`}>
				<img
					className="object-contain h-full "
					src="/76745d89868413.5e04311b1b5f4-removebg-preview.png"
				/>
			</div>
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	if (data.password !== data.verifyPassword) {
		toast.error("password and verify password does not match‼️");
		return null;
	}
	const obj: signupFormDataInterface = {
		username: data.username as string,
		password: data.password as string,
		email: data.email as string,
	};
	return await signUser(obj);
}

export default SignUp;

