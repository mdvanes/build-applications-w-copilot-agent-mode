import mongoose, { Schema, Document } from 'mongoose'

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  type: string
  distance?: number
  duration?: number
  calories?: number
  date: Date
}

const ActivitySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distance: { type: Number },
  duration: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IActivity>('Activity', ActivitySchema)
