export type ActionResult = { error: string } | { error?: undefined };

export const invalidInput = { error: "Some details are missing or invalid. Please check the form and try again." };

export const signedOut = { error: "Please sign in to continue." };
