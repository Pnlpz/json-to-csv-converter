import { useState } from 'react';
import { FileText } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { CSVDownload } from '@/components/CSVDownload';
import { FeatureCards } from '@/components/FeatureCards';
import { convertToCSV, flattenTableArray, flattenTableObject } from '@/utils/csvConverter';

const Index = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [csvData, setCsvData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const handleFileProcessed = (data: any, name: string) => {
    setJsonData(data);
    setFileName(name);
    const flattened = Array.isArray(data) ? flattenTableArray(data) : [flattenTableObject(data)];
    const csvContent = convertToCSV(flattened);
    setCsvData(csvContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Data Harmonizer Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your JSON data into clean, structured CSV files with ease. 
            Perfect for data analysis, reporting, and database imports.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <FileUpload onFileProcessed={handleFileProcessed} />
          
          <ProcessingStatus isVisible={!!jsonData} />
          
          <CSVDownload 
            csvData={csvData} 
            fileName={fileName} 
            isVisible={!!csvData} 
          />

          <FeatureCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
