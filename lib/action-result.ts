export type ActionResult<Data = object> =
  { error: string } | ({ error?: undefined } & Data);

export const invalidInput = {
  error:
    "Some details are missing or invalid. Please check the form and try again.",
};

export const signedOut = { error: "Please sign in to continue." };

export const serviceUnreachable =
  "The service could not be reached. Please try again in a moment.";
