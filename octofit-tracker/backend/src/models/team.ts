import mongoose, { Schema, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description?: string
  members: mongoose.Types.ObjectId[]
  createdAt: Date
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<ITeam>('Team', TeamSchema)
