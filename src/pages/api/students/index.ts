import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";


export const POST: APIRoute = async ({ request, redirect }) => {
  console.log(request)
  const formData = await request.formData();
  const first_name = formData.get("first_name")?.toString();
  const last_name = formData.get("last_name")?.toString();
  const email = formData.get("email")?.toString();
  
  if (!first_name || !last_name || !email) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const studentsRef = db.collection("Students");
    await studentsRef.add({
      first_name,
      last_name,
      email
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/");
};