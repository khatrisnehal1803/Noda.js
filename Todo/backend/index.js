import express from 'express';

const app = express();
const PORT = 4040;

app.use(express.json())

const todos = [
    {
        id: 1,
        title: "Complete React project",
        description: "Finish the UI and backend integration for the dashboard.",
        status: "in-progress",
        priority: "high",
        createdAt: "2025-11-10",
        updatedAt: "2025-11-12",
        dueDate: "2025-11-20",
        isPinned: true,
        category: "work",
    },
    {
        id: 2,
        title: "Buy groceries",
        description: "Milk, eggs, vegetables, bread and some snacks.",
        status: "pending",
        priority: "medium",
        createdAt: "2025-11-11",
        updatedAt: "2025-11-11",
        dueDate: null,
        isPinned: false,
        category: "personal",
    },
    {
        id: 3,
        title: "Study JavaScript patterns",
        description: "Practice closures, currying, and factory function patterns.",
        status: "pending",
        priority: "high",
        createdAt: "2025-11-09",
        updatedAt: "2025-11-10",
        dueDate: "2025-11-18",
        isPinned: false,
        category: "learning",
    },
    {
        id: 4,
        title: "Clean workspace",
        description: "Organize desk, clean laptop screen, remove clutter.",
        status: "completed",
        priority: "low",
        createdAt: "2025-11-08",
        updatedAt: "2025-11-09",
        dueDate: null,
        isPinned: false,
        category: "personal",
    },
];
app.get("/api/todos", (req, res) => {
    res.status(200).send(todos);
})

app.post("/api/add-todo", (req, res) => {
    const { title, description, priority, dueDate, category } = req.body;

    if ([title, description, priority, dueDate, category].some((field) => field.trim() === "")) {
        throw new Error("All the fields are required")
    }

    const date = new Date().toISOString().split("T")[0];

    const todo = {
        id: todos.length + 1,
        title,
        description,
        status: "Pending",
        priority,
        dueDate,
        category,
        isPinned: false,
        createdAt: date,
        updatedAt: date
    }

    todos.push(todo)

    res.status(201).send(todos)
})

app.put("/api/update-todo/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, category, priority, dueDate } = req.body;

    const todoId = Number(id);

    if (!todoId) {
        throw new Error("Id is required")
    }

    if ([title, description].some((field) => field.trim() === "")) {
        throw new Error("All the fields are required")
    }

    const date = new Date().toISOString().split("T")[0];

    const index = todos.findIndex((todo) => todo.id === todoId);

    if (index === -1) {
        throw new Error(`Todo does not exist on this id:${id}`)
    }

    todos[index] = {
        ...todos[index],
        title,
        description,
        category,
        priority,
        dueDate
    }

    res.status(200).send(todos)

})

app.delete("/api/todo/:id", (req, res) => {
    const { id } = req.params;
    
    const todoId = Number(id);

    if(!id) {
        throw new Error("Id is required")
    }

    todos.filter((todo, index) => {
        if(todo.id === todoId) {
            todos.splice(index, 1)
        }
    })

    res.status(200).send(todos)

})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})