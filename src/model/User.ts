import mongoose, { Schema, Document } from "mongoose";


//  Message Schema
export interface Message extends Document {
    content: string; // in typeScript string start from small s
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },   // in mongoose String start from capital S
    createdAt: { type: Date, default: Date.now }
});



//  User Schema
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpires: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is required'],
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, 'Verify code expires is required'],

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema));

export default UserModel;