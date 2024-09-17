import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../../lib/auth.ts";
import type Source from "../../../../lib/source.ts";
import { generate_citation } from "../../../../lib/lib.ts";

export const POST: APIRoute = async ({ params, request, cookies }) => {
  let source: Source = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!source) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  source.student_id = user.uid;

  if (!params.id) {
    return new Response("Cannot find source", {
      status: 404,
    });
  }

  try {
    const db = getFirestore(app);
    const sources_ref = doc(db, "Sources", params.id);
    getDoc(sources_ref).then((doc) => {
      if ((doc.data() as Source).student_id == user.uid) {
        source.full_citation = generate_citation(source);
        updateDoc(sources_ref, { ...source });
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        });
      }
    }).catch((error) => {
      console.log(error)
      return new Response("Error while editing source", {
        status: 500,
      })
    });
  } catch (error) {
    return new Response("Error while editing source", {
      status: 500,
    });
  }

  return new Response("source added successfully", { status: 200 });
};