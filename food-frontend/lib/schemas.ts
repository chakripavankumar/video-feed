import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const foodCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  // server expects multipart file for video
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
export type FoodCreateDTO = z.infer<typeof foodCreateSchema>;