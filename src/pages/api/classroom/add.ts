import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";
import type Class from "../../../lib/class.ts";
import Hashids from 'hashids'

export const POST: APIRoute = async ({ request, cookies }) => {
  let new_class: Class = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!new_class) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  new_class.teacher_id = user.uid;
  new_class.teacher_name = user.displayName!
  new_class.class_code = (new Hashids().encode(Date.now())).toString().toUpperCase();


  try {
    const db = getFirestore(app);
    const classes_ref = db.collection("Class");
    await classes_ref.add({
      ...new_class,
    });
  } catch (error) {
    return new Response("Error while adding class", {
      status: 500,
    });
  }

  return new Response("class added successfully", { status: 200 });
};



