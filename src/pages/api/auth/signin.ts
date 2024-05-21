import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "No token found", { status: 401 }
    );
  }
  /* Verify id token */

  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }
  
  const sessionLen = 1000 * 60 * 5
    // 60 * 60 * 24 * 3 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: sessionLen,
  });
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);
  if(Date.parse(user.metadata.creationTime) - Date.parse(user.metadata.lastSignInTime) < 6000) {
    const db = getFirestore(app);
    db.collection("Students")
      .where("email", "==", user.email)
      .get()
      .then(querySnapshot => {
            if(!querySnapshot.empty) {
              querySnapshot.docs[0].ref.update({
                google_id: user.uid,
                google_photo: user.photoURL,
                display_name: user.displayName
              })
            }
        
      })
  }


  cookies.set("__session", sessionCookie, {
    path: "/",
  });
  
  return redirect("/account");
};