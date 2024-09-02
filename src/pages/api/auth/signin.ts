import type { APIRoute } from "astro";
import type User from "../../../lib/user";
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
  const user_auth_info = await auth.getUser(decoded_cookie.uid);
  const db = getFirestore(app);



  db.collection("Users")
    .where("email", "==", user_auth_info.email)
    .get()
    .then(query_snapshot => {
      let date = new Date().getTime();
      let current_streak = 0;
      let max_streak = 0;
      if (!query_snapshot.empty) {
        query_snapshot.docs[0].ref.get().then(doc => {
          let user = doc.data() as User;
          max_streak = user.max_streak;
          if (Number(user.last_login) - date >= 24 * 3600000) {
            current_streak = 1;
          } else {
            current_streak = user.streak + 1;
          }

        });

        query_snapshot.docs[0].ref.update({
          google_id: user_auth_info.uid,
          google_photo: user_auth_info.photoURL,
          display_name: user_auth_info.displayName,
          last_login: date.toString(),
          streak: current_streak,
          max_streak: Math.max(current_streak, max_streak)
        })


      } else {
        db.collection("Students").doc(user_auth_info.uid).set({
          email: user_auth_info.email,
          google_photo: user_auth_info.photoURL,
          display_name: user_auth_info.displayName,
          streak: 1,
          max_streak: 1,
          awards: [],
          project_completion: 0.00,
          last_login: (new Date()).getTime().toString(),
          teacher_id: "",
          class_id: "",
          allow_public_streak_record: true,
          allow_public_awards_record: true,
          allow_public_progress_view: false,
          allow_teacher_view: false,
          //teacher_id and class_id are initialized when a USER gets added or joins a class
        })
      }


    }).catch(error => {
      console.log('Error fetching user from database: ', error);
    });



  cookies.set("__session", session_cookie, {
    path: "/",
  });

  return redirect("/project/sources");
};