import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { appendTodo, completeTodo, getCompletedTodos, getDueTodos, deleteTodo } from './data';
import { useAuth0 } from '@auth0/auth0-react';

const DueTodos = () => {
	const { user, isAuthenticated, logout } = useAuth0();

	if (!isAuthenticated) {
		return <Navigate to="/" />
	}
	const [dueTodos, setDueTodos] = useState(getDueTodos(user.nickname));
	const [completedTodos, setCompletedTodos] = useState(getCompletedTodos(user.nickname));
	const inputRef = useRef(null);

	const addTask = () => {
		const inputValue = inputRef.current.value;
		appendTodo(user.nickname, inputValue);
		setDueTodos(getDueTodos(user.nickname));
		inputRef.current.value = "";
	}

	const completeTask = (id) => {
		completeTodo(user.nickname, id);
		setDueTodos(getDueTodos(user.nickname));
		setCompletedTodos(getCompletedTodos(user.nickname));
	}

	const deleteTask = id => {
		console.log(id);
		deleteTodo(user.nickname, id);
		setCompletedTodos(getCompletedTodos(user.nickname));
	}

	useEffect(() => {
		setDueTodos(getDueTodos(user.nickname));
		setCompletedTodos(getCompletedTodos(user.nickname));
	}, []);


	return (
		<div className="">
			<button
				className='bg-white px-4 py-2 rounded-md text-slate-800'
				onClick={() => logout(() => logout({ logoutParams: { returnTo: window.location.origin } }))}
			>
				Logout
			</button>
			<div className=''>
				<div className="">To-Do List</div>
				<div className="">
					<input ref={inputRef} type="text" className='' placeholder='Enter your text' />
					<button onClick={() => addTask()} className='' type='submit'>Add Task</button>
				</div>
				<div className="text-3xl">
					Due Todos:
				</div>
				<div className="space-y-4">
					{
						dueTodos.map((item) => {
							return (
								<div key={item.id} onClick={() => completeTask(item.id)} className='bg-slate-400 p-5 flex justify-between'>
									<div className=''>{item.task}</div>
								</div>
							)
						})
					}
				</div>
				<div className="text-3xl">
					Completed Todos:
				</div>
				<div className="space-y-4">
					{
						completedTodos.map((item) => {
							return (
								<div key={item.id} className='bg-slate-400 p-5 flex justify-between'>
									<div className='line-through'>{item.task}</div>
									<button onClick={() => deleteTask(item.id)}>delete</button>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default DueTodos;
