const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title:   { type: String, required: true, trim: true },
  client:  { type: String, required: true, trim: true },
  dueDate: { type: Date,   required: true },
  status:  { type: String, enum: ['Pending','In Progress','Completed','On Hold'], default: 'Pending' },
  notes:   { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
