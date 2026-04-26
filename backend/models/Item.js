import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    supplierName: {
      type: String,
      required: [true, "Supplier Name is required"],
      trim: true,
      minlength: [2, "Supplier Name must be at least 2 characters"],
      maxlength: [100, "Supplier Name must be at most 100 characters"],
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9\s.,'-]+$/.test(v);
        },
        message: props => `${props.value} is not a valid Supplier Name!`
      }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);