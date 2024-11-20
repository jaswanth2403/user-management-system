import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const formattedUsers = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: user.company?.name || "N/A",
      }));
      setUsers(formattedUsers);
    } catch {
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
      setUsers([...users, { ...response.data, id: users.length + 1 }]);
      alert("User added successfully!");
    } catch {
      alert("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = async (user) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      alert("User updated successfully!");
    } catch {
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch {
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <UserForm onSubmit={selectedUser ? handleEditUser : handleAddUser} user={selectedUser} />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setSelectedUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
