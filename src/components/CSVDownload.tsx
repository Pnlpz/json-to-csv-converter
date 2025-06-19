
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface CSVDownloadProps {
  csvData: string;
  fileName: string;
  isVisible: boolean;
}

export const CSVDownload = ({ csvData, fileName, isVisible }: CSVDownloadProps) => {
  const downloadCSV = () => {
    if (!csvData) return;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName.replace('.json', '')}_converted.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV file downloaded successfully!');
  };

  if (!isVisible) return null;

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Download className="h-5 w-5" />
          Download CSV File
        </CardTitle>
        <CardDescription>
          Your JSON data has been converted to CSV format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-2">Preview (first 200 characters):</h4>
            <code className="text-sm text-gray-600 bg-gray-50 p-2 rounded block overflow-hidden">
              {csvData.substring(0, 200)}...
            </code>
          </div>
          <Button 
            onClick={downloadCSV}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download CSV File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
