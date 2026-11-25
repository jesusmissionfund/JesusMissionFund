"use server";

import { createAccount } from "../create-account";
import type { AccountInput } from "../schema";

export async function createPartnerAccount(input: AccountInput) {
  return createAccount(input, "partner");
}
