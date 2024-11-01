import React, { useState } from 'react';
import jsPDF from 'jspdf';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import './../../../../public/fonts/IRANSansX-Medium.ttf';

const PdfDownload: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  console.log(pdfUrl);

  const generatePdfWithTable = (): void => {
    const doc = new jsPDF();
    doc.addFont('./../../../../public/fonts/IRANSansX-Medium.ttf', 'Tahoma', 'normal');

    doc.setFont('Tahoma');
    doc.text('یییب', 10, 10);

    const headers = [['سلام', fa.reports.card.factor, fa.global.score]];
    const data = [
      ['1', 'John Doe', '25'],
      ['2', 'Jane Smith', '30'],
      ['3', 'Sam Green', '28'],
      ['4', 'Alice Brown', '22'],
    ];

    doc.setFont('Amiri');

    const pdfBlobUrl = doc.output('bloburl');
    setPdfUrl(pdfBlobUrl.toString()); // Save the PDF URL to display it in an iframe
  };
  return (
    <>
      <Button onClick={generatePdfWithTable} className="btn btn-primary min-h-10 h-10">
        {fa.reports.card.downloadPdf}
      </Button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />}
    </>
  );
};

export default PdfDownload;
