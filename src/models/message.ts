import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  username: string;
  text: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
export { IMessage };
