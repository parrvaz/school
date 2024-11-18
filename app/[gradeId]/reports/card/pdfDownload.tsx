import React, { useState } from 'react';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GroupDateType, ReportCardType } from 'app/types/common.type';

const PdfDownload: React.FC<{
  data: ReportCardType[] | undefined;
  date: GroupDateType;
  gradeId: number;
}> = ({ data, date, gradeId }) => {
  const [loading, setLoading] = useState(false);
  const name = `${fa.reports.card.card}-${date.startDate}-${date.endDate}`;

  const downloadPDF = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, gradeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
    setLoading(false);
  };

  return (
    <Button
      onClick={downloadPDF}
      isLoading={loading}
      className=" btn btn-primary w-44 ml-4 btn-outline"
    >
      {fa.reports.card.downloadPdf}
    </Button>
  );
};

export default PdfDownload;
