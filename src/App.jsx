
import React, { useState } from "react";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [buses, setBuses] = useState([
    {
      id: 1,
      number: "BUS101",
      route: "Guntur - Vijayawada",
      driver: "Ramesh",
      time: "08:00 AM"
    },
    {
      id: 2,
      number: "BUS102",
      route: "Guntur - Hyderabad",
      driver: "Suresh",
      time: "09:30 AM"
    }
  ]);

  const [form, setForm] = useState({
    number: "",
    route: "",
    driver: "",
    time: ""
  });

  const [editId, setEditId] = useState(null);

  // ADMIN LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (userId === "vijay" && password === "135789") {
      setIsAdmin(true);
      alert("Admin Login Successful!");
      setUserId("");
      setPassword("");
    } else {
      alert("Invalid User ID or Password!");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setIsAdmin(false);
    setEditId(null);
    setForm({ number: "", route: "", driver: "", time: "" });
  };

  // CREATE AND UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) return;

    if (editId !== null) {
      setBuses(buses.map(bus =>
        bus.id === editId
          ? { ...form, id: editId }
          : bus
      ));
      setEditId(null);
    } else {
      setBuses([...buses, { ...form, id: Date.now() }]);
    }

    setForm({ number: "", route: "", driver: "", time: "" });
  };

  // EDIT
  const handleEdit = (bus) => {
    if (!isAdmin) return;

    setForm({
      number: bus.number,
      route: bus.route,
      driver: bus.driver,
      time: bus.time
    });

    setEditId(bus.id);
  };

  // DELETE
  const handleDelete = (id) => {
    if (!isAdmin) return;
    setBuses(buses.filter(bus => bus.id !== id));
  };

  return (
    <div className="container">
      <h1>Bus Reservation Schedule</h1>

      {!isAdmin ? (
        <form onSubmit={handleLogin} className="login">
          <h2>Admin Login</h2>

          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          <p>Only the authorized admin can manage bus details.</p>
        </form>
      ) : (
        <div>
          <h3>Welcome Admin!</h3>
          <button onClick={handleLogout}>Logout</button>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Bus Number"
              value={form.number}
              onChange={e => setForm({...form, number: e.target.value})}
              required
            />

            <input
              placeholder="Route"
              value={form.route}
              onChange={e => setForm({...form, route: e.target.value})}
              required
            />

            <input
              placeholder="Driver Name"
              value={form.driver}
              onChange={e => setForm({...form, driver: e.target.value})}
              required
            />

            <input
              placeholder="Departure Time"
              value={form.time}
              onChange={e => setForm({...form, time: e.target.value})}
              required
            />

            <button type="submit">
              {editId !== null ? "Update Bus" : "Add Bus"}
            </button>
          </form>
        </div>
      )}

      <h2>Bus Details</h2>

      <table>
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Driver Name</th>
            <th>Departure Time</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {buses.map(bus => (
            <tr key={bus.id}>
              <td>{bus.number}</td>
              <td>{bus.route}</td>
              <td>{bus.driver}</td>
              <td>{bus.time}</td>

              {isAdmin && (
                <td>
                  <button onClick={() => handleEdit(bus)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(bus.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
