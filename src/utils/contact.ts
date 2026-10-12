import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre (al menos 2 caracteres).")
    .max(100, "Usá hasta 100 caracteres."),
  email: z.email("Ingresá un email válido.").max(254),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono de contacto.")
    .max(30)
    .regex(/^[+\d\s().-]+$/, "Usá números y signos habituales de teléfono."),
  eventType: z.string().min(1, "Elegí el tipo de evento."),
  date: z
    .string()
    .refine(
      (value) =>
        !value || (/^\d{4}-\d{2}-\d{2}$/.test(value) && value >= localDate()),
      "Elegí una fecha estimada a partir de hoy.",
    ),
  location: z
    .string()
    .trim()
    .min(2, "Ingresá la localidad del evento.")
    .max(150),
  services: z.array(z.string()).min(1, "Elegí al menos una experiencia."),
  message: z.string().trim().max(2000, "Usá hasta 2000 caracteres."),
});
export type ContactValues = z.infer<typeof contactSchema>;
export function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function formatInquiry(values: ContactValues, serviceNames: string[]) {
  const date = values.date
    ? values.date.split("-").reverse().join("/")
    : "A definir";
  return `Hola TCN, quiero consultar por mi evento.\n\nNombre: ${values.name}\nEmail: ${values.email}\nTeléfono: ${values.phone}\nTipo de evento: ${values.eventType}\nFecha estimada: ${date}\nLocalidad: ${values.location}\nExperiencias: ${serviceNames.join(", ")}\n\n${values.message || "Me gustaría conocer las opciones."}\n\nEntiendo que el proyecto está en prelanzamiento y la disponibilidad está a confirmar.`;
}
export function whatsappUrl(phone: string, message: string) {
  return /^\d{8,15}$/.test(phone)
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : null;
}
export function emailUrl(email: string, message: string) {
  return z.email().safeParse(email).success
    ? `mailto:${email}?subject=${encodeURIComponent("Consulta de evento — TCN")}&body=${encodeURIComponent(message)}`
    : null;
}
export function downloadInquiry(message: string) {
  const url = URL.createObjectURL(
    new Blob([message], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "consulta-tcn.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
