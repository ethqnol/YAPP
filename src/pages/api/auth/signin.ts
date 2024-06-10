import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const AUTH = getAuth(app);
  /* Get token from request headers */
  const id_token = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!id_token) {
    return new Response(
      "No token found", { status: 401 }
    );
  }
  /* Verify id token */

  try {
    await AUTH.verifyIdToken(id_token);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }
  
  //session length
  
  const SESSION_COOKIE = await AUTH.createSessionCookie(id_token, {
    expiresIn: import.meta.env.SESSION_LEN,
  });
  const DECODED_COOKIE = await AUTH.verifySessionCookie(SESSION_COOKIE);
  const USER = await AUTH.getUser(DECODED_COOKIE.uid);
  const db = getFirestore(app);
  db.collection("Students")
    .where("email", "==", USER.email)
    .get()
    .then(querySnapshot => {
          if(!querySnapshot.empty) {
            querySnapshot.docs[0].ref.update({
              google_id: USER.uid,
              google_photo: USER.photoURL,
              display_name: USER.displayName,
            })
          } else {
            db.collection("Students").doc(USER.uid).set({
              email: USER.email,
              google_photo: USER.photoURL,
              display_name: USER.displayName,
              streak: 1,
              awards: [],
              project_completion: 0.00,
              //teacher_id and class_id are initialized when a USER gets added or joins a class
            })
          }
      
    }).catch(error => {
      console.log(error);
    });



  cookies.set("__session", SESSION_COOKIE, {
    path: "/",
  });
  return redirect("/account");
};