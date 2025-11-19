import { Routes, Route } from "react-router-dom";
import TodoApp from "../components/TodoApp";
import Home from "../components/Home";
import TodoForm from '../components/TodoForm'
import WorkTodo from "../components/WorkTodo";
import PersonalTodo from "../components/PersonalTodo";
import LearningTodo from "../components/LearningTodo";



export default function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<TodoApp />} >
                <Route index element={<Home />} />
                <Route path="/work" element={<WorkTodo />} />
                <Route path="/personal" element={<PersonalTodo />} />
                <Route path="/learning" element={<LearningTodo />} />
            </Route>

            <Route path="/add-todo" element={<TodoForm />} />
        </Routes>
    )
}