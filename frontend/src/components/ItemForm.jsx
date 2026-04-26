import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      supplierName: "",
    }
  );
  const [supplierNameError, setSupplierNameError] = useState("");

  const validateSupplierName = (name) => {
    if (!name.trim()) return "Supplier Name is required.";
    if (name.length < 2) return "Supplier Name must be at least 2 characters.";
    if (!/^[a-zA-Z0-9\s.,'-]+$/.test(name)) return "Supplier Name contains invalid characters.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "supplierName") {
      setSupplierNameError(validateSupplierName(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateSupplierName(formData.supplierName);
    setSupplierNameError(error);
    if (error) return;
    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label>Supplier Name</label>
      <input
        name="supplierName"
        value={formData.supplierName}
        onChange={handleChange}
        required
      />
      {supplierNameError && (
        <div style={{ color: "red", marginBottom: "8px" }}>{supplierNameError}</div>
      )}

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;