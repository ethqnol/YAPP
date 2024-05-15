import { HttpsError, beforeUserSignedIn } from "firebase-functions/v2/identity";

export const beforecreated = beforeUserSignedIn((event) => {
  const user = event.data;
  if (!user?.email?.includes('@commschool.org')) {
    throw new HttpsError('invalid-argument', "Unauthorized email");
  }
});

