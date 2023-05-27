import { Schema, model, models } from 'mongoose';

const StatsSettingsSchema = new Schema({
  gamesPlayed: { type: Boolean, default: true },
  groundOuts: { type: Boolean, default: false },
  airOuts: { type: Boolean, default: false },
  doubles: { type: Boolean, default: false },
  triples: { type: Boolean, default: false },
  homeRuns: { type: Boolean, default: true },
  strikeOuts: { type: Boolean, default: true },
  baseOnBalls: { type: Boolean, default: true },
  intentionalWalks: { type: Boolean, default: false },
  hits: { type: Boolean, default: true },
  hitByPitch: { type: Boolean, default: false },
  avg: { type: Boolean, default: true },
  atBats: { type: Boolean, default: true },
  obp: { type: Boolean, default: true },
  slg: { type: Boolean, default: true },
  ops: { type: Boolean, default: true },
  groundIntoDoublePlay: { type: Boolean, default: false },
  groundIntoTriplePlay: { type: Boolean, default: false },
  numberOfPitches: { type: Boolean, default: false },
  plateAppearances: { type: Boolean, default: true },
  totalBases: { type: Boolean, default: false },
  rbi: { type: Boolean, default: true },
  leftOnBase: { type: Boolean, default: false },
  sacBunts: { type: Boolean, default: false },
  sacFlies: { type: Boolean, default: false },
  babip: { type: Boolean, default: false },
  groundOutsToAirouts: { type: Boolean, default: false },
  catchersInterference: { type: Boolean, default: false },
  atBatsPerHomeRun: { type: Boolean, default: false },
});

const SettingsSchema = new Schema({
  stats: [StatsSettingsSchema]
})

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    requred: [true, 'Email is required!'],
  },
  name: {
    type: String,
    requred: [true, 'Name is required!'],
  },
  favTeam: {
    type: Number,
  },
  image: {
    type: String,
  },
  settings: [SettingsSchema],
});

const User = models.User || model('User', UserSchema);

export default User;
