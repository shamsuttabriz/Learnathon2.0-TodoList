import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Content/pages/Dashboard';
import Sign_in from './Content/pages/Sign_in';
import Header from './Header/Header';
import Todos from './Content/pages/Todos';
import Footer from './Footer/Footer';

function App() {
	return (
		<BrowserRouter>
			<header>
				<Header />
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
