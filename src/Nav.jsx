import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Nav() {
	const { isAuthenticated, logout } = useAuth0();
	return (
		<nav className="flex justify-between h-12 items-center px-16 md:px-20 lg:px-32 py-3 bg-slate-600 shadow shadow-slate-600">
			<div className="text-2xl text-white font-semibold">
				Learnathon2.0
			</div>
			<div className="space-x-2 text-white">
				{
					isAuthenticated ?
						(
							<div>
								<NavLink
									to="/dashboard"
									className={({ isActive }) => isActive ?
														 "bg-white px-3 py-3.5 rounded text-slate-600"
														 : "px-3 py-2"}
								>
									Dashboard
								</NavLink>
								<NavLink to="/todos" className={({ isActive }) => isActive ?
																								"bg-white text-slate-600 px-3 py-[0.95rem] rounded"
																								: "px-3 py-2"}
								>
									Todos
								</NavLink>
							</div>
								)
						:
						(
							<div></div>
						)
				}
			</div>
		</nav>
	)
}
