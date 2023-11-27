import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { allTodosCount, getDueTodos, getCompletedTodos } from "./storage/data";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<div className="text-lg space-y-3">
				<img src={user.picture} className="rounded-full" alt={user.name} />
				<div className="">
					<div>{user.name}</div>
					<div>{user.email}</div>
				</div>
			</div>
		)
	);
};

export default function Dashboard() {
	const { user, isAuthenticated, logout } = useAuth0();

	if (!isAuthenticated) {
		return <Navigate to="/" />
	}

	return (
		<div className="bg-slate-600 text-white p-10 space-y-3 rounded-xl">
			<div className="flex justify-between space-y-4 items-center">
				<div className="text-3xl">
					Welcome to,
					<span className="font-semibold">
						&nbsp;Learnathon2.0
					</span>
				</div>
				<button
					className='bg-white px-4 font-semibold py-2 rounded-md text-slate-800'
					onClick={() => logout(() => logout({ logoutParams: { returnTo: window.location.origin } }))}
				>
					Logout
				</button>
			</div>

			<Profile />
			<div className="flex justify-between text-2xl pt-4">
				<div className="text-blue-300">
					Total Task: {allTodosCount(user.nickname)}
				</div>
				<div className="text-green-300">
					Completed Task: {getCompletedTodos(user.nickname).length}
				</div>
				<div className="text-red-300">
					Due Task: {getDueTodos(user.nickname).length}
				</div>
			</div>
		</div>
	)
}
