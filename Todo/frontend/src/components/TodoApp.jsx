import React, { useState, useEffect } from "react";
import { Outlet, NavLink} from 'react-router-dom'

import axios from 'axios'
import Home from "./Home";

export default function TodoApp() {
    const { data: todos, loading, error} = useFetch("/api/todos")

    if (loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Something went wrong...</div>
    } 

    return (
        <div className="min-h-screen bg-stone-800 text-white p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
                {/* Left column - minimal Notion sidebar */}
                <aside className="col-span-3 bg-stone-900 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white font-bold">RB</div>
                        <div>
                            <div className="text-sm font-semibold">My Workspace</div>
                            <div className="text-xs text-stone-500">Personal</div>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <NavLink className="w-full block text-left p-2 rounded hover:bg-white hover:text-black" to="/">📋 All Todos</NavLink>
                        <NavLink className="w-full block text-left p-2 rounded hover:bg-white hover:text-black" to="/work">🗂️ Work</NavLink>
                        <NavLink className="w-full block text-left p-2 rounded hover:bg-white hover:text-black" to="/learning">📚 Learning</NavLink>
                        <NavLink className="w-full block text-left p-2 rounded hover:bg-white hover:text-black" to="/personal">🏠 Personal</NavLink>
                    </nav>
                </aside>

                {/* Main column */}
                <main className="col-span-9">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-stone-900 py-3 px-4 rounded-xl mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold">Todos</h1>
                            <p className="text-sm text-stone-500">Notion-like view to keep tasks organized</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <NavLink className="px-4 py-2 rounded-md border shadow-sm hover:bg-white hover:text-black" to="/add-todo">Add todo</NavLink>
                        </div>
                    </div>

                    {/* Content area — cards in a column like Notion blocks */}
                    <Outlet context={{todos}} />
                </main>
            </div>
        </div>
    );
}


// import { useEffect, useState } from "react";
// import axios from "axios";

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { data, loading, error };
}