/** Show safe, server-authored validation/delivery errors without clearing input. */
export async function checkFormResponse(response: Response): Promise<void> {
  if (response.ok) return;
  let message = "No fue posible enviar el formulario. Inténtalo más tarde.";
  try {
    const data = await response.json();
    if (typeof data.error === "string") message = data.error;
  } catch { /* Hosting proxies may return a non-JSON error page. */ }
  throw new Error(message);
}
