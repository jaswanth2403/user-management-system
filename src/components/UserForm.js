import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, user }) => {
  const [formState, setFormState] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Populate form fields with the selected user data for editing
  useEffect(() => {
    if (user) {
      setFormState(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>{user ? "Edit User" : "Add User"}</h3>
      <div className="mb-3">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          value={formState.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          value={formState.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Department</label>
        <input
          type="text"
          name="department"
          className="form-control"
          value={formState.department}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {user ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default UserForm;
