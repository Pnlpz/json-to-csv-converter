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
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-zinc-800 rounded-xl shadow-lg">
              <FileText className="h-8 w-8 text-zinc-100" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            json-to-csv-converter
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
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
