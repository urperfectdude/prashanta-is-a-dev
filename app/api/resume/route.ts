import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const RESUME_FILENAME = "Prashanta_Nayak_Product.pdf";

export async function GET() {
  try {
    const resumePath = path.join(
      process.cwd(),
      "content",
      RESUME_FILENAME
    );

    const fileBuffer = await fs.readFile(resumePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Resume file not found." },
      { status: 404 }
    );
  }
}
