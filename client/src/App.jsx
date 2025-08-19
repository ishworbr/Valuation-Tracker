import { useState } from "react";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ name: "", client: "", dueDate: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.client || !form.dueDate) {
      alert("Please fill all fields!");
      return;
    }
    setAssignments([...assignments, form]);
    setForm({ name: "", client: "", dueDate: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Valuation Assignment Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Assignment Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "1rem" }}
        />
        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={form.client}
          onChange={handleChange}
          style={{ marginRight: "1rem" }}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          style={{ marginRight: "1rem" }}
        />
        <button type="submit">Add Assignment</button>
      </form>

      <h2>Assignments List</h2>
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {assignments.map((a, index) => (
            <li key={index}>
              <strong>{a.name}</strong> for {a.client} — on {a.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
