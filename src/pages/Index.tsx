
import { useState, useCallback } from 'react';
import { Upload, Download, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const Index = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [csvData, setCsvData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      toast.error('Please upload a JSON file');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      setJsonData(data);
      convertToCSV(data);
      toast.success('JSON file processed successfully!');
    } catch (error) {
      toast.error('Error parsing JSON file');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const convertToCSV = (data: any) => {
    const tableData = data.table || data;
    
    const headers = [
      'id', 'name', 'provider', 'description', 'tools', 'license', 'github_url', 
      'website_url', 'documentation_url', 'npm_url', 'twitter_url', 'discord_url', 
      'logo', 'category', 'content', 'installation_guide', 'popularity', 'slug', 
      'created_at', 'updated_at', 'last_updated', 'readme_content', 'main_files', 
      'dependencies', 'stars', 'forks'
    ];

    const arrayToString = (arr: any) => {
      return Array.isArray(arr) ? JSON.stringify(arr) : arr || '';
    };

    const csvRow = [
      tableData.id || '',
      tableData.name || '',
      tableData.provider || '',
      tableData.description || '',
      arrayToString(tableData.tools),
      tableData.license || '',
      tableData.github_url || '',
      tableData.website_url || '',
      tableData.documentation_url || '',
      tableData.npm_url || '',
      tableData.twitter_url || '',
      tableData.discord_url || '',
      tableData.logo || '',
      tableData.category || '',
      tableData.content || '',
      tableData.installation_guide || '',
      tableData.popularity || '',
      tableData.slug || '',
      tableData.created_at || '',
      tableData.updated_at || '',
      tableData.last_updated || '',
      tableData.readme_content || '',
      arrayToString(tableData.main_files),
      arrayToString(tableData.dependencies),
      tableData.stars || '',
      tableData.forks || ''
    ];

    const escapeCsvField = (field: string) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    const csvContent = [
      headers.join(','),
      csvRow.map(field => escapeCsvField(String(field))).join(',')
    ].join('\n');

    setCsvData(csvContent);
  };

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
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Upload JSON File
              </CardTitle>
              <CardDescription>
                Drag and drop your JSON file here, or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isProcessing}
                />
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full inline-block">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {isProcessing ? 'Processing...' : 'Choose a JSON file or drag it here'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports .json files up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          {jsonData && (
            <div className="flex items-center justify-center space-x-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-green-800 font-medium">
                File processed successfully! Ready to download CSV.
              </span>
              <ArrowRight className="h-5 w-5 text-green-600" />
            </div>
          )}

          {/* Download Section */}
          {csvData && (
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
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Conversion</h3>
              <p className="text-sm text-gray-600">
                Automatically handles arrays, nested objects, and complex data structures
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Data Integrity</h3>
              <p className="text-sm text-gray-600">
                Preserves data accuracy with proper escaping and formatting
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600">
                Process and download your converted files in seconds
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
