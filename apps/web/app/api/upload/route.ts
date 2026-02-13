import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const MAX_FILE_SIZE_MB = 2;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const body = await request.json();
  const contentLength = Number(
    body?.contentLength ?? body?.contentLengthInBytes ?? body?.size ?? 0
  );
  if (Number.isFinite(contentLength) && contentLength > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: `Archivo demasiado grande. Maximo ${MAX_FILE_SIZE_MB} MB.` },
      { status: 413 }
    );
  }

  const response = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => {
      return {
        allowedContentTypes: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        tokenPayload: JSON.stringify({ purpose: "afiliacion" }),
      };
    },
    onUploadCompleted: async () => {
      // no-op
    },
  });

  return NextResponse.json(response);
}
