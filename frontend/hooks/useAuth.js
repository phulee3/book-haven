import { useState } from 'react';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      province: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng",
      address: "123 Đường ABC",
      role: "user",
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@bookhaven.com",
      phone: "0987654321",
      province: "Hà Nội",
      district: "Ba Đình",
      ward: "Phúc Xá",
      address: "456 Đường XYZ",
      role: "admin",
    },
  ]);

  const handleLogin = (email, password, setCurrentPage) => {
    const user = users.find((u) => u.email === email && password === "123456");
    if (user) {
      setCurrentUser(user);
      setShowLoginModal(false);
      if (user.role === "admin") {
        setCurrentPage("admin");
      }
      return true;
    }
    return false;
  };

  const handleRegister = (newUserData) => {
    const exists = users.some((u) => u.email === newUserData.email);
    if (exists) return { success: false, message: "Email đã tồn tại" };
    const newUser = { id: Date.now(), role: "user", ...newUserData };
    setUsers([...users, newUser]);
    setShowRegister(false);
    return { success: true };
  };

  const handleLogout = (setCurrentPage) => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  return {
    currentUser,
    setCurrentUser,
    showLoginModal,
    setShowLoginModal,
    showRegister,
    setShowRegister,
    users,
    setUsers,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}