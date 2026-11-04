import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().regex(/^[6-9]\d{9}$/).optional().or(z.literal("")),
}).refine(
  (data) => Boolean(data.email || data.phone),
  {
    message: "Email or mobile number is required",
    path: ["email"],
  }
);

export const loginSchema = z.object({
  identifier: z.string().trim().min(3).max(120),
});

export const sellerSchema = z.object({
  storeName: z.string().trim().min(2).max(100),
  description: z.string().trim().min(20).max(1000),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/),
});

export const productSchema = z.object({
  name: z.string().trim().min(3).max(150),
  description: z.string().trim().min(20).max(5000),
  category: z.string().trim().min(2).max(80),
  price: z.number().positive().max(10000000),
  stock: z.number().int().min(0).max(100000),
});

export const addressSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  address: z.string().trim().min(5).max(300),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/),
});

export const supportTicketSchema = z.object({
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SellerInput = z.infer<typeof sellerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type AddressInput = z.infer<typeof addressSchema>;