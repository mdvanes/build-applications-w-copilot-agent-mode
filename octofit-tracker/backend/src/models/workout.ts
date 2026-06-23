import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  creator: mongoose.Types.ObjectId
  exercises: { name: string; reps?: number; sets?: number; duration?: number }[]
  duration?: number
  date: Date
  notes?: string
}

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  duration: { type: Number }
}, { _id: false })

const WorkoutSchema: Schema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: { type: [ExerciseSchema], default: [] },
  duration: { type: Number },
  date: { type: Date, default: () => new Date() },
  notes: { type: String }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
