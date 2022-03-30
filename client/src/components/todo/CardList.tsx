import { useEffect, useState } from 'react'
import { FcSynchronize, FcTodoList } from 'react-icons/fc'
import TodoService from '../../utils/api/service/TodoService'
import { ReadTodo } from '../../utils/interface/TodoInterfaces'
import Card from './Card'
import cardStyles from './Card.module.css'
import styles from './CardList.module.css'
import NewTask from './NewTask'


const CardList = () => {
	const [todos, setTodos] = useState<Array<ReadTodo>>([])
	
	function getAllTodos() {
		TodoService.findAllTodos()
			.then((response) => {
				setTodos(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	
	useEffect(() => {
		getAllTodos()
	}, [todos])
	
	function noTodos() {
		return (
			<div className={ styles.noTodos }>
				<FcTodoList className={ styles.iconPlaceholder }/>
				<h2>No Todos</h2>
			</div>
		)
	}
	
	function renderTodos() {
		return todos.map((todo) => {
			return (
				<Card key={ todo._id } todo={ todo } setTodos={ setTodos }/>
			)
		})
	}
	
	return (
		<section>
			<NewTask/>
			<h1>ToDo's <FcSynchronize className={ cardStyles.icon } onClick={ () => setTodos([]) }/></h1>
			
			{ todos.length === 0 ? noTodos() : renderTodos() }
		</section>
	)
}

export default CardList
