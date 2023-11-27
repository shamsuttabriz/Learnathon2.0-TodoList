import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sign_in from './pages/Sign_in';
import Nav from './Nav';
import Todos from './pages/Todos';
import Footer from './Footer';

function App() {
	return (
		<BrowserRouter>
			<header>
				<Nav />
			</header>
			<main className="w-2/3 mx-auto mt-10">
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/todos" element={<Todos />} />
					<Route path="/" element={<Sign_in />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</BrowserRouter>
	)
}

export default App
