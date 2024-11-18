import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';

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
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
        body {
          font-family: 'Vazirmatn', sans-serif;
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
          page-break-after: always;
        }
        table {
          width: 100%;
          direction: rtl;
          border-collapse: collapse;
        }
        th, td {
          padding: 0.25rem;
          border: 1px solid #64748b;
          text-align: center;
          font-size: 0.875rem;
        }
        th {
          background: #f1f5f9;
          font-size: 1rem;
        }
        tr:nth-child(odd) {
          background: #eee;
        }
        tr:nth-child(even) {
          background: #fff;
        }
      </style>
    </head>
    <body>
      <div>
        ${data
          .map(
            (item) => `
            <div class="page">
              <div style="background-color: #FFF; padding: 1.75rem; width: 794px; height: 1123px;">
                <div style="display: flex; gap: 0.75rem; margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; text-align: center; line-height: 1.25rem; font-size: 0.8125rem;">
                    <div>${i18n.info1}</div>
                    <div>${i18n.info2}</div>
                    <div>${i18n.info3}</div>
                    <div>${i18n.info4}</div>
                    <div>${fa.global[`grade${gradeId}th`]}</div>
                  </div>
                  <div
                    style="
                      flex: 1;
                      border: 1px solid #475569;
                      font-size: 0.75rem;
                      text-align: start;
                      padding: 0.25rem 0.5rem;
                      background-color: #eee;
                      font-weight: 600;
                      display: flex;
                      flex-direction: column;
                      gap: 6px;
                    "
                  >
                    <div>${i18n.info5}</div>
                    <div>${i18n.info6}</div>
                    <div>${i18n.info7}</div>
                    <div>${i18n.info8}</div>
                  </div>
                  <div
                    style="
                      flex: 1;
                      border: 1px solid #475569;
                      font-size: 0.75rem;
                      text-align: start;
                      padding: 0.25rem 0.5rem;
                      background-color: #eee;
                      font-weight: 600;
                      display: flex;
                      flex-direction: column;
                      gap: 6px;
                    "
                  >
                    <div>${i18n.info9} ${item.firstName ? `: ${item?.firstName}` : ''}</div>
                    <div>${i18n.info10} ${item.lastName ? `: ${item.lastName}` : ''}</div>
                    <div>${i18n.info11}</div>
                    <div>${i18n.info12}</div>
                  </div>
                  <div style="width: 5rem; height: 6rem; border: 1px solid #475569;"></div>
                </div>
                <div style="text-align: center; border: 1px solid #64748b; border-radius: 0.375rem; overflow: hidden;">
                  <table>
                    <thead>
                      <tr>
                        <th>${fa.global.courseName}</th>
                        <th>${fa.global.factor}</th>
                        <th>${fa.global.score}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${item?.scores
                        ?.map(
                          (score) => `
                          <tr>
                            <td>${score.course}</td>
                            <td>${faNumber(score.factor)}</td>
                            <td>${faNumber(score.score)}</td>
                          </tr>
                        `
                        )
                        .join('')}
                    </tbody>
                  </table>
                </div>

                <div style="display: flex; align-items: center; width: fit-content; font-weight: bold; border: 1px solid #475569; border-radius: 0.375rem; margin-top: 1.25rem;">
                    <div style="border-left: 1px solid #475569; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 1.25rem; padding-right: 1.25rem;">
                        ${fa.global.average}
                    </div>
                    <div style="padding-left: 1.25rem; padding-right: 1.25rem; font-size: 1.25rem;">
                        ${faNumber(item?.average)}
                    </div>
                </div>
              </div>
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
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
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
