import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth.ts";
import type Source from "../../../lib/source";
import { generate_citation, generate_long_footnote, generate_short_footnote } from "../../../lib/lib.ts";


export const POST: APIRoute = async ({ request, cookies }) => {
  const source: Source = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!source || !source.title || !source.authors || !source.publishing_location || !source.publishing_company) {
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
    await addDoc(collection(db, "Sources"), {
      ...source,
    });

  } catch (error) {
    return new Response("Error while adding source", {
      status: 500,
    });
  }

  return new Response("Source added successfully", { status: 200 });
};



