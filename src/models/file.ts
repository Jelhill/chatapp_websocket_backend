import mongoose, { Document, Schema } from 'mongoose';

interface IFile extends Document {
  filename: string;
  filepath: string;
  timestamp: Date;
}

const FileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const File = mongoose.model<IFile>('File', FileSchema);

export default File;
export { IFile };
