import { deliverSubmission } from "@/lib/public-submissions";
import { talentoEmail } from "@/lib/email-templates";
import { attachment } from "@/lib/form-email";
import { documentFile, formErrorResponse, readBody, talento } from "@/lib/form-validation";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const form = await (await readBody(request, 4_300_000)).formData();
    const data = talento(form);
    const [cv, carta] = await Promise.all([
      documentFile(form.get("cv"), "Hoja de vida"),
      documentFile(form.get("carta"), "Carta pastoral"),
    ]);
    const attachments = await Promise.all([attachment(cv, "Hoja-de-vida"), attachment(carta, "Carta-pastoral")]);
    return await deliverSubmission(talentoEmail(data, [attachments[0].filename, attachments[1].filename]), async (db, id) => {
      const paths = attachments.map(a => `${id}/${a.filename}`);
      for (const [index, file] of [cv,carta].entries()) {
        const { error } = await db.storage.from("postulaciones").upload(paths[index], file, { contentType: file.type || "application/octet-stream", upsert: true });
        if (error) throw error;
      }
      const { error } = await db.from("postulaciones").upsert({ id, ...data, cv_path: paths[0], carta_path: paths[1] }, { onConflict: "id", ignoreDuplicates: true });
      if (error) throw error;
    }, attachments);
  } catch (error) { return formErrorResponse(error); }
}
