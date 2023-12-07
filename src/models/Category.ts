import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  id: Number,
  name: String,
  image: String
});
export default mongoose.model("Category", CategorySchema);
