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
  
  //session length
  const sessionLen = 60 * 60 * 24 * 7 * 1000;
  
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: sessionLen,
  });
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);
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
          } else {
            db.collection("Students").add({
              email: user.email,
              google_id: user.uid,
              google_photo: user.photoURL,
              display_name: user.displayName,
              streak: 1,
              awards: [],
              project_completion: 0.00,
              //teacher_id and class_id are initialized when a user gets added or joins a class
            })
          }
      
    }).catch(error => {
      console.log(error);
    });



  cookies.set("__session", sessionCookie, {
    path: "/",
  });
  return redirect("/account");
};