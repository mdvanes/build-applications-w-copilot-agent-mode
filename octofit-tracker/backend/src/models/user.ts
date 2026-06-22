import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  team?: mongoose.Types.ObjectId
  bio?: string
  avatarUrl?: string
  joinedAt: Date
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  bio: { type: String },
  avatarUrl: { type: String },
  joinedAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IUser>('User', UserSchema)
