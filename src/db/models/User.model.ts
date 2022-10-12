import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDoc extends IUser, Document {
  verifyPassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUserDoc>(
  {
    username: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model('User', UserSchema);
