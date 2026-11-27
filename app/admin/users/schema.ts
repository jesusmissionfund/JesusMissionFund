import { accountSchema, type AccountInput } from "@/app/(auth)/signup/schema";

export const adminSchema = accountSchema;

export type AdminInput = AccountInput;
