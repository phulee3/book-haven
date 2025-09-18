import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: "Sách thiếu nhi" },
    { id: 2, name: "Sách giáo dục" },
    { id: 3, name: "Sách kỹ năng sống" },
    { id: 4, name: "Truyện cổ tích" },
  ]);

  const value = {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    setCategories
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
