import type { APIRoute } from "astro";
import { app, getSessionUser } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type Source from "../../../lib/source";
import {generate_citation} from "../../../lib/lib.ts";


export const POST: APIRoute = async ({ request, cookies }) => {
  const source : Source = await request.json();
  const user = await getSessionUser(cookies);
  if(!user) {
    return new Response("Unauthorized", {status: 403});
  }
  if (!source || !source.title || !source.authors || !source.publishing_location || !source.publishing_company ) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  source.full_citation = generate_citation(source);
  source.student_id = user.uid;
  try {
    const db = getFirestore(app);
    const sources_ref = db.collection("Sources");
    await sources_ref.add({
      ...source,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  
  return new Response("Source added successfully", {status: 200});
};



