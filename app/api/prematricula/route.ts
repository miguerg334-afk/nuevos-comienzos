import { deliverSubmission } from "@/lib/public-submissions";
import { prematriculaEmail } from "@/lib/email-templates";
import { formErrorResponse, prematricula, readBody } from "@/lib/form-validation";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const data = prematricula(await (await readBody(request, 30_000)).json());
    return await deliverSubmission(prematriculaEmail(data), async (db, id) => {
      const { error } = await db.from("prematriculas").upsert({ id, ...data }, { onConflict: "id", ignoreDuplicates: true });
      if (error) throw error;
    });
  } catch (error) { return formErrorResponse(error); }
}
