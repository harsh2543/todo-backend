const express = require('express');
const {
    createTodo,
    updateTodo,
    deleteTodo,
    markAsCompleted,
    getTodos,
} = require('../controllers/todoController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getTodos);
router.post('/', authMiddleware, createTodo);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);
router.patch('/:id/completed', authMiddleware, markAsCompleted);

module.exports = router;
