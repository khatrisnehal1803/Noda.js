import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

export default function AddTodoForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const editeData = location.state;

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: editeData?.title || "",
            description: editeData?.description || "",
            category: editeData?.category || "",
            priority: editeData?.priority || "medium",
            dueDate: editeData?.dueDate || ""
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            category: Yup.string().required("Category is required"),
            priority: Yup.string().required("Priority is required"),
            dueDate: Yup.string().nullable(),
        }),

        onSubmit: async (values) => {
            if (editeData?.id) {
                // EDIT MODE
                const response = await axios.put(`/api/update-todo/${editeData.id}`, { ...values, id: editeData.id });
                if (response.data) {
                    navigate("/");
                }

            } else {
                // ADD MODE
                const response = await axios.post("/api/add-todo", values);
                if (response.data) {
                    navigate("/");
                }
            }
        },
    });

    return (
        <div className="w-full h-screen bg-stone-900 flex justify-center items-center">
            <div className="w-130 mx-auto bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-xl text-center font-semibold mb-4">
                    {editeData ? "Edit Todo" : "Add New Todo"}
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full mt-1 p-2 border rounded-md bg-stone-50 focus:ring-2 focus:ring-black outline-none"
                            placeholder="Todo title..."
                            {...formik.getFieldProps("title")}
                        />

                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-600 text-xs mt-1">{formik.errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            className="w-full mt-1 p-2 border rounded-md bg-stone-50 focus:ring-2 focus:ring-black outline-none"
                            placeholder="Describe your task..."
                            {...formik.getFieldProps("description")}
                        />

                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-600 text-xs mt-1">{formik.errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            name="category"
                            className="w-full mt-1 p-2 border rounded-md bg-stone-50 focus:ring-2 focus:ring-black outline-none"
                            {...formik.getFieldProps("category")}
                        >
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="learning">Learning</option>
                        </select>

                        {formik.touched.priority && formik.errors.priority && (
                            <p className="text-red-600 text-xs mt-1">{formik.errors.priority}</p>
                        )}
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium">Priority</label>
                        <select
                            name="priority"
                            className="w-full mt-1 p-2 border rounded-md bg-stone-50 focus:ring-2 focus:ring-black outline-none"
                            {...formik.getFieldProps("priority")}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        {formik.touched.priority && formik.errors.priority && (
                            <p className="text-red-600 text-xs mt-1">{formik.errors.priority}</p>
                        )}
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className="w-full mt-1 p-2 border rounded-md bg-stone-50 focus:ring-2 focus:ring-black outline-none"
                            {...formik.getFieldProps("dueDate")}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-md border hover:bg-stone-100"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-black text-white hover:bg-stone-800"
                        >
                            {editeData ? "Update Todo" : "Add Todo"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}