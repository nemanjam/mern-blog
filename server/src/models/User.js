import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },

  // local
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    maxlength: 60,
  },

  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleEmail: String,
  googleDisplayName: String,
  googlePicture: String,

  // fb
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookEmail: String,
  facebookDisplayName: String,
  facebookProfileUrl: String,
});

userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

export default User;
