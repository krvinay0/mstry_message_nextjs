import {z} from 'zod';

export const signInSchema = z.object({
    identifier : z.string().min(3, {message: 'Identifier must be at least 3 characters long'}),
    password : z.string().min(8, {message: 'Password must be at least 8 characters long'}),
});