import { useState } from "react";

const ADD_TITLE = "Add Data"; // TODO: replace with the exact Add title from your Figma
const EDIT_TITLE = "Let's see what you want to change!";

const emptyForm = { date: "", intake: "", burned: "", description: "" };

function HealthForm({ mode, record, onSubmit, onCancel }) {
  const [form, setForm] = useState(record ? { ...record } : emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Date is required";
    if (form.intake === "" || Number(form.intake) < 0)
      e.intake = "Enter a valid calorie intake";
    if (form.burned === "" || Number(form.burned) < 0)
      e.burned = "Enter a valid calories burned";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit({
        date: form.date,
        intake: Number(form.intake),
        burned: Number(form.burned),
        description: form.description.trim(),
      });
    }
  };

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit} noValidate>
        <h2>{mode === "edit" ? EDIT_TITLE : ADD_TITLE}</h2>

        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <p className="error">{errors.date}</p>}

        <label htmlFor="intake">Calories Intake</label>
        <input
          id="intake" type="number" name="intake" min="0"
          placeholder="Enter Today's Calorie Intake"
          value={form.intake} onChange={handleChange}
        />
        {errors.intake && <p className="error">{errors.intake}</p>}

        <label htmlFor="burned">Calories Burned</label>
        <input
          id="burned" type="number" name="burned" min="0"
          placeholder="Enter Today's Calorie Burned"
          value={form.burned} onChange={handleChange}
        />
        {errors.burned && <p className="error">{errors.burned}</p>}

        <label htmlFor="description">Short Description</label>
        <input
          id="description" type="text" name="description"
          placeholder="Enter a short description"
          value={form.description} onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default HealthForm;