import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function Login() {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	
	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace={true} />
	}

	return (
		<div className="flex items-center justify-center h-96">
			<div className="text-center space-y-8">
				<div className="space-y-2">
					<p className="text-6xl">Learnathon2.0</p>
					<div className="text-4xl">Shamsut Tabriz</div>
				</div>
				<button
					className="px-5 py-2 bg-slate-700 text-white rounded-md"
					onClick={() => loginWithRedirect()}
				>
					Sign in
				</button>
			</div>
		</div>
	)
}
