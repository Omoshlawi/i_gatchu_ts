import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(4),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

export const ProfileSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
});

export const SupportServiceSchema = z.object({
  image: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});

export const EmegencyAlertSchema = z.object({
  images: z.array(z.string()).optional().default([]),
  location: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    address: z.string(),
  }),
  description: z.string().optional(),
  title: z.string(),
  supportServiceId: z.string().uuid().optional(),
});

export const EmergencyReponseSchema = z.object({
  images: z.array(z.string()).optional().default([]),
  description: z.string().optional(),
  responderName: z.string(),
  complete: z.boolean().optional(),
  alertId: z.string().uuid(),
});
