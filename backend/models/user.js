import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true, minLength: 3 },
  passwordHash: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

// Pre-save middleware
userSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.username;
  }
  next();
});

// Transform method to hide certain fields
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model('User', userSchema);
