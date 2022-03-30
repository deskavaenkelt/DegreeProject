import { Request, Response } from 'express'
import TodoModel from '../models/TodoModel'
import { CreateTodo } from '../utils/interface/Todos'
import Logger from '../utils/Logger'
import StatusCode from '../utils/StatusCode'

const create = async (req: Request, res: Response) => {
	try {
		Logger.http(req.body)
		const {title, assignedTo}: CreateTodo = req.body
		const todo = new TodoModel({
			title,
			completed: false,
			assignedTo
		})
		await todo.save()
		res.status(StatusCode.CREATED).json(todo)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

const findAllTodos = async (req: Request, res: Response) => {
	try {
		Logger.http(req.body)
		const todos = await TodoModel.find()
		Logger.debug(todos)
		res.status(StatusCode.OK).json(todos)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

const findTodoById = async (req: Request, res: Response) => {
	try {
		const {id} = req.params
		const todo = await TodoModel.findById(id)
		Logger.debug(todo)
		res.status(StatusCode.OK).json(todo)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

const updateTodo = async (req: Request, res: Response) => {
	try {
		const {id} = req.params
		const {title, assignedTo} = req.body
		const todo = await TodoModel.findByIdAndUpdate(id, {
			title,
			assignedTo
		}, {new: true})
		Logger.debug(todo)
		res.status(StatusCode.OK).json(todo)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

const toggleTodoStatus = async (req: Request, res: Response) => {
	try {
		const {id} = req.params
		const {newTodoStatus} = req.body
		const todo = await TodoModel.findByIdAndUpdate(id, {
			completed: newTodoStatus
		}, {new: true})
		Logger.debug(todo)
		res.status(StatusCode.OK).json(todo)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

const deleteTodo = async (req: Request, res: Response) => {
	try {
		const {id} = req.params
		const todo = await TodoModel.findByIdAndDelete(id)
		Logger.debug(todo)
		res.status(StatusCode.OK).json(todo)
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
	}
}

export default {
	create,
	findAllTodos,
	findTodoById,
	updateTodo,
	toggleTodoStatus,
	deleteTodo
}
