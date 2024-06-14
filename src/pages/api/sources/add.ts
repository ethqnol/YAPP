import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type Source from "../../../lib/source";
import {generate_citation, generate_long_footnote, generate_short_footnote } from "../../../lib/lib.ts";


export const POST: APIRoute = async ({ request, cookies }) => {
  const source : Source = await request.json();
  const user = await get_user_session(cookies);
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
  source.footnote_long = generate_long_footnote(source);
  source.footnote_short = generate_short_footnote(source);
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



