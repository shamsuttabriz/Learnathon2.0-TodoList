import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { appendTodo, completeTodo, getCompletedTodos, getDueTodos, deleteTodo } from './storage/data';
import { useAuth0 } from '@auth0/auth0-react';
// Font Awesome Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
		<div className="bg-slate-600 p-10 rounded-xl mb-20">
			<div className="bg-slate-600 mb-5 flex justify-between items-center">
				<div className="text-4xl font-semibold text-slate-200 ">To-Do List</div>
				<button
					className='bg-white px-4 font-semibold py-2 rounded-md text-slate-800'
					onClick={() => logout(() => logout({ logoutParams: { returnTo: window.location.origin } }))}
				>
					Logout
				</button>
			</div>
			<form className="w-full flex justify-between items-center">
				<input ref={inputRef} type="text" className='w-10/12 text-slate-600 bg-slate-200 py-3 px-6 focus:outline-none text-lg font-medium rounded-l-sm rounded-r-none placeholder:text-slate-400' placeholder='Enter your task ' />
				<button onClick={(e) => { e.preventDefault(); addTask() }} className='w-64 font-semibold rounded-r-sm text-lg bg-slate-900 text-slate-200 p-3' type='submit'>Add Task</button>
			</form>
			<div className="text-xl font-semibold my-3  bg-slate-900 text-slate-200 p-3 pl-5 rounded-sm">
				Due Todos
			</div>
			<div className="space-y-2">
				{
					dueTodos.map((item) => {
						return (
							<div key={item.id} className='bg-slate-400 text-slate-900 py-3 px-6 flex justify-between item-center rounded-sm'>
								<div className='font-medium'>{item.task}</div>
								<div className='text-md cursor-pointer' onClick={() => completeTask(item.id)} ><FontAwesomeIcon icon={faSquare} /></div>
							</div>
						)
					})
				}
			</div>
			<div className="text-xl font-semibold my-3  bg-slate-900 text-slate-200 p-3 pl-5 rounded-sm">
				Completed Todos
			</div>
			<div className="space-y-2">
				{
					completedTodos.map((item) => {
						return (
							<div key={item.id} className='bg-slate-400 text-slate-900 py-3 px-6 flex justify-between item-center rounded-sm'>
								<div className='line-through font-medium opacity-70'>{item.task}</div>
								<button onClick={() => deleteTask(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default DueTodos;
