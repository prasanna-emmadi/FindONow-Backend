import mongoose from "mongoose";
 const Schema = mongoose.Schema;
 const ObjectId = Schema.ObjectId;

 const OrderDetailSchema = new Schema({
    id: ObjectId,
    name: String,
 });

 export default mongoose.model("OrderDetail",OrderDetailSchema);
