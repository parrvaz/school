import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fa from 'app/lib/fa.json';

// POST handler
export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { data, gradeId } = await req.json();
    const i18n = fa.reports.pdfDownload;

    // Launch a Puppeteer instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set HTML content dynamically
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
           @font-face {
            font-family: 'IRANSans_Medium';
            src: url('./../../../public/fonts/IRANSansX-Medium.ttf');
          }
         body {
            font-family: 'IRANSans_Medium', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
          }
          .page {
            width: 794px;
            height: 1123px;
            padding: 28px;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .flex { display: flex; gap: 12px; }
          .gap-3 { gap: 12px; }
          .border { border: 1px solid #475569; }
          .font-bold { font-weight: bold; }
          .font-semibold { font-weight: 600; }
          .text-13 { font-size: 0.8125rem; line-height: 1.125rem; }
          .text-12 { font-size: 0.75rem; line-height: 1.5rem; }
          .text-20 { font-size: 1.25rem; }
          .rtl { direction: rtl; }
          .text-center { text-align: center; }
          .p-7 { padding: 28px; }
          .mb-2 { margin-bottom: 8px; }
          .w-[794px] { width: 794px; }
          .h-[1123px] { height: 1123px; }
          .bg-black30 { background: #cbd5e1; }
          .bg-white { background: white; }
          .overflow-hidden { overflow: hidden; }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            border: 1px solid #64748b;
            padding: 8px;
            text-align: center;
          }
          .table th {
            background-color: #cbd5e1;
          }
          .rounded-md { border-radius: 0.375rem; }
        </style>
      </head>
      <body>
        <div>
          ${data
            .map(
              (item) => `
              <div class="page">
            111
              </div>
            `
            )
            .join('')}
        </div>
      </body>
      </html>
    `);

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Return PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=report.pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
