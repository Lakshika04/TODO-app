import express from 'express'
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/add',addTodo)
router.get('/todo',getTodo)
router.put("/:id",updateTodo)
router.delete("/:id",deleteTodo)

export default router