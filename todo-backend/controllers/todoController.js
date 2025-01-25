const Todo = require('../models/Todo');

// Retrieve all todos for the authenticated user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }); // Fetch todos for the logged-in user
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error fetching todos:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const newTodo = new Todo({ title, description, user: req.user.id });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        console.error('Error creating todo:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title && !description) {
        return res.status(400).json({ error: 'At least one field (title or description) is required' });
    }

    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this todo' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error('Error updating todo:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this todo' });
        }

        await todo.remove();
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Mark a todo as completed
exports.markAsCompleted = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this todo' });
        }

        todo.isCompleted = true;
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error('Error marking todo as completed:', err.message);
        res.status(500).json({ error: err.message });
    }
};
