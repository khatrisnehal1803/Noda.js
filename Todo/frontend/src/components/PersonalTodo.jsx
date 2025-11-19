import React from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from 'axios'

function PersonalTodo() {
    const navigate = useNavigate();
    const { todos } = useOutletContext();

    const workTodos = todos?.filter((t) => t.category === "personal");

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`/api/todo/${id}`);
            console.log("Deleted:", response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const editTodo = async (t) => {
        navigate("/add-todo", {
            state: {
                id: t.id,
                title: t.title,
                description: t.description,
                category: t.category,
                priority: t.priority,
                dueDate: t.dueDate
            }
        })
    }

    return (
        <div className="space-y-4">
            {workTodos?.map((t) => (
                <article key={t.id} className="bg-white text-black rounded-lg p-4 shadow-sm border">
                    <header className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="font-medium text-lg">{t.title}</h2>
                            <div className="text-xs  mt-1">{t.category} • {t.priority} • {t.createdAt}</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full border ${t.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-stone-50 text-stone-700'}`}>
                                {t.status}
                            </span>
                        </div>
                    </header>

                    <p className="mt-3 text-stone-700">{t.description}</p>

                    <footer className="mt-4 flex items-center justify-between text-xs text-stone-500">
                        <div>Due: {t.dueDate ?? '—'}</div>
                        <div className="flex items-center gap-3">
                            <button
                                className="px-2 py-1 rounded-md text-sm hover:bg-stone-100"
                                onClick={() => editTodo(t)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-2 py-1 rounded-md text-sm hover:bg-stone-100"
                                onClick={() => deleteTodo(t.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </footer>
                </article>
            ))}
        </div>
    )
}

export default PersonalTodo