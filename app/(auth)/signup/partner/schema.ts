import type { SignupStep } from "../schema";

export const steps = [
  {
    id: "account",
    title: "Create your account",
    description: "You'll use these details to sign in.",
  },
  {
    id: "partnership",
    title: "Your partnership",
    description:
      "Share how you hope to stand with missionaries. You can complete your gift through mobile money after submitting.",
  },
] as const satisfies readonly SignupStep[];
