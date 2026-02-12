import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta variable de entorno: ${name}`);
  }
  return value;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const get = (key: string) => String(formData.get(key) ?? "").trim();

    const nombres = get("nombres");
    const apellidos = get("apellidos");
    const dni = get("dni");
    const celular = get("celular");
    const correo = get("correo");
    const gerencia = get("gerencia");
    const sede = get("sede");
    const profesion = get("profesion");
    const fechaIngreso = get("fecha_ingreso");
    const regimen = get("regimen");
    const comentario = get("comentario");

    const archivo = formData.get("formato_firmado");
    if (!(archivo instanceof File)) {
      return NextResponse.redirect(
        new URL("/afiliacion/formulario?error=1", req.url),
        303
      );
    }

    const maxSizeMb = 10;
    if (archivo.size > maxSizeMb * 1024 * 1024) {
      return NextResponse.redirect(
        new URL("/afiliacion/formulario?error=1", req.url),
        303
      );
    }

    const host = requireEnv("SMTP_HOST");
    const port = Number(requireEnv("SMTP_PORT"));
    const user = requireEnv("SMTP_USER");
    const pass = requireEnv("SMTP_PASS");
    const from = process.env.SMTP_FROM || `SITCAS <${user}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const attachment = {
      filename: archivo.name || "formato-afiliacion",
      content: Buffer.from(await archivo.arrayBuffer()),
      contentType: archivo.type || "application/octet-stream",
    };

    const subject = `Nueva solicitud de afiliación - ${nombres} ${apellidos}`;

    const text = [
      `Nombres: ${nombres}`,
      `Apellidos: ${apellidos}`,
      `DNI: ${dni}`,
      `Celular: ${celular}`,
      `Correo: ${correo}`,
      `Gerencia/Subgerencia: ${gerencia}`,
      `Sede: ${sede || "-"}`,
      `Profesión: ${profesion}`,
      `Fecha ingreso a la Contraloría: ${fechaIngreso}`,
      `Régimen laboral: ${regimen}`,
      `Comentario: ${comentario || "-"}`,
    ].join("\n");

    const html = `
      <h2>Nueva solicitud de afiliación</h2>
      <ul>
        <li><strong>Nombres:</strong> ${nombres}</li>
        <li><strong>Apellidos:</strong> ${apellidos}</li>
        <li><strong>DNI:</strong> ${dni}</li>
        <li><strong>Celular:</strong> ${celular}</li>
        <li><strong>Correo:</strong> ${correo}</li>
        <li><strong>Gerencia/Subgerencia:</strong> ${gerencia}</li>
        <li><strong>Sede:</strong> ${sede || "-"}</li>
        <li><strong>Profesión:</strong> ${profesion}</li>
        <li><strong>Fecha ingreso a la Contraloría:</strong> ${fechaIngreso}</li>
        <li><strong>Régimen laboral:</strong> ${regimen}</li>
        <li><strong>Comentario:</strong> ${comentario || "-"}</li>
      </ul>
    `;

    await transporter.sendMail({
      from,
      to: "afiliacion@sitcascgr.com",
      replyTo: correo || undefined,
      subject,
      text,
      html,
      attachments: [attachment],
    });

    if (correo) {
      const confirmSubject = "Hemos recibido tu solicitud de afiliación";
      const confirmText = [
        `Hola ${nombres} ${apellidos},`,
        "",
        "Hemos recibido tu solicitud de afiliación.",
        "Gracias por tu confianza. Pronto estaremos en comunicación contigo.",
        "",
        "Atentamente,",
        "SITCAS",
      ].join("\n");

      const confirmHtml = `
        <p>Hola <strong>${nombres} ${apellidos}</strong>,</p>
        <p>Hemos recibido tu solicitud de afiliación.</p>
        <p>Gracias por tu confianza. Pronto estaremos en comunicación contigo.</p>
        <p>Atentamente,<br/>SITCAS</p>
      `;

      try {
        await transporter.sendMail({
          from,
          to: correo,
          subject: confirmSubject,
          text: confirmText,
          html: confirmHtml,
        });
      } catch {
        // Si falla el correo de confirmación, no bloqueamos el envío principal
      }
    }

    return NextResponse.redirect(
      new URL("/afiliacion/formulario?ok=1", req.url),
      303
    );
  } catch (err) {
    return NextResponse.redirect(
      new URL("/afiliacion/formulario?error=1", req.url),
      303
    );
  }
}
