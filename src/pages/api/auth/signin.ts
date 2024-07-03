import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);
  /* Get token from request headers */
  const id_token = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!id_token) {
    return new Response(
      "No token found", { status: 401 }
    );
  }
  /* Verify id token */

  try {
    await auth.verifyIdToken(id_token);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }

  //session length
  const session_cookie = await auth.createSessionCookie(id_token, {
    expiresIn: parseInt(import.meta.env.SESSION_LEN),
  });
  const decoded_cookie = await auth.verifySessionCookie(session_cookie);
  const user = await auth.getUser(decoded_cookie.uid);
  const db = getFirestore(app);
  db.collection("Students")
    .where("email", "==", user.email)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.docs[0].ref.update({
          google_id: user.uid,
          google_photo: user.photoURL,
          display_name: user.displayName,
        })
      } else {
        db.collection("Students").doc(user.uid).set({
          email: user.email,
          google_photo: user.photoURL,
          display_name: user.displayName,
          streak: 1,
          awards: [],
          project_completion: 0.00,
          //teacher_id and class_id are initialized when a USER gets added or joins a class
        })
      }

    }).catch(error => {
      console.log('Error fetching student from database: ', error);
    });



  cookies.set("__session", session_cookie, {
    path: "/",
  });

  return redirect("/account");
};