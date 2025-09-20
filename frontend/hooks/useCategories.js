"use client"

import { useState } from "react"

export const useCategories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Sách thiếu nhi", key: "children" },
        { id: 2, name: "Kỹ năng sống", key: "self-help" },
        { id: 3, name: "Kinh doanh", key: "business" },
        { id: 4, name: "Sức khỏe", key: "health" },
    ])

    const addCategory = (categoryData) => {
        const newCategory = {
            id: Date.now(),
            ...categoryData,
            key: categoryData.name.toLowerCase().replace(/\s+/g, '-')
        }
        setCategories(prev => [...prev, newCategory])
        return newCategory
    }

    const updateCategory = (categoryId, categoryData) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? {
                        ...category,
                        ...categoryData,
                        key: categoryData.name?.toLowerCase().replace(/\s+/g, '-') || category.key
                    }
                    : category
            )
        )
    }

    const deleteCategory = (categoryId) => {
        setCategories(prev => prev.filter(category => category.id !== categoryId))
    }

    const getCategoryByKey = (key) => {
        return categories.find(category => category.key === key)
    }

    const getCategoryById = (id) => {
        return categories.find(category => category.id === id)
    }

    return {
        categories,
        setCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryByKey,
        getCategoryById,
    }
}