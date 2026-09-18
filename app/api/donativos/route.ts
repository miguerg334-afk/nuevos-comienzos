import { deliverSubmission } from "@/lib/public-submissions";
import { donativoEmail } from "@/lib/email-templates";
import { donativo, formErrorResponse, readBody } from "@/lib/form-validation";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const data = donativo(await (await readBody(request, 15_000)).json());
    return await deliverSubmission(donativoEmail(data), async (db, id) => {
      const { error } = await db.from("intereses_donativos").upsert({ id, ...data }, { onConflict: "id", ignoreDuplicates: true });
      if (error) throw error;
    });
  } catch (error) { return formErrorResponse(error); }
}
