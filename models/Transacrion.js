import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  amount: {
    type: Number
  },
  type: {
    type: String,
  }
}, {
  timestamps: true
});


const Transaction = new mongoose.model('transaction', transactionSchema);
export default Transaction;