import { useState, useCallback } from 'react';
import { Upload, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileProcessed: (data: any, fileName: string) => void;
}

export const FileUpload = ({ onFileProcessed }: FileUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [previewData, setPreviewData] = useState<any>(null);

  const MAX_FILE_SIZE_MB = 10;
  const SAMPLE_JSON_URL = 'https://jsonplaceholder.typicode.com/users'; // Replace with your own sample if needed

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
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      setErrorMessage(
        '❌ Unsupported file type. Please upload a file with a .json extension.\nTip: You can export JSON from most tools, or use the sample JSON below as a template.'
      );
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage(
        `❌ File too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB}MB. Split your data if needed.`
      );
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');
    
    try {
      const text = await file.text();
      let cleanedText = text.trim();
      const lastBraceIndex = Math.max(cleanedText.lastIndexOf('}'), cleanedText.lastIndexOf(']'));
      if (lastBraceIndex !== -1 && lastBraceIndex < cleanedText.length - 1) {
        cleanedText = cleanedText.substring(0, lastBraceIndex + 1);
      }
      const data = JSON.parse(cleanedText);
      // Check for empty or invalid data structure
      if (
        (!Array.isArray(data) && typeof data !== 'object') ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
      ) {
        setErrorMessage(
          '❌ The uploaded file does not contain valid data.\nSolution: The JSON should be an array of objects, each with the required fields. See the sample JSON below.'
        );
        setSelectedFile(null);
        setPreviewData(null);
        return;
      }
      setPreviewData(data);
      toast.success('JSON file loaded successfully! Click "Process File" to convert.');
    } catch (error) {
      const errorMsg = error instanceof SyntaxError
        ? `❌ Invalid JSON format. ${error.message}\nSolution: Make sure your file is valid JSON. You can check your file with https://jsonlint.com/`
        : '❌ Error reading the file. Please try again.';
      setErrorMessage(errorMsg);
      setSelectedFile(null);
      setPreviewData(null);
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile || !previewData) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      let processedData = previewData;
      if (Array.isArray(previewData)) {
        processedData = previewData;
      } else {
        processedData = [previewData];
      }
      onFileProcessed(processedData, selectedFile.name);
      toast.success(`JSON file processed successfully! ${Array.isArray(previewData) ? previewData.length + ' items' : '1 item'} converted to CSV.`);
      setSelectedFile(null);
      setPreviewData(null);
    } catch (error) {
      const errorMsg = `❌ An error occurred while processing your file. ${error instanceof Error ? error.message : 'Unknown error'}\nSolution: Double-check your data format. If the problem persists, contact support or see the sample JSON below.`;
      setErrorMessage(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setErrorMessage('');
  };

  return (
    <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Upload JSON File
        </CardTitle>
        <CardDescription>
          Drag and drop your JSON file here, or click to browse. Supports both single objects and arrays.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div className="mt-2">
                <a
                  href={SAMPLE_JSON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Sample JSON
                </a>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {selectedFile && previewData && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">File Ready for Processing</span>
            </div>
            <div className="text-sm text-green-700 mb-3">
              <p><strong>File:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
              <p><strong>Type:</strong> {Array.isArray(previewData) ? `Array (${previewData.length} items)` : 'Single Object'}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleProcessFile} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                {isProcessing ? 'Processing...' : 'Process File'}
              </Button>
              <Button onClick={resetUpload} variant="outline" disabled={isProcessing}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${selectedFile ? 'opacity-50' : ''}`}
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
            disabled={isProcessing || !!selectedFile}
          />
          
          <div className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-full inline-block">
              {selectedFile ? (
                <FileText className="h-8 w-8 text-green-400" />
              ) : (
                <Upload className="h-8 w-8 text-blue-400" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-white mb-2">
                {selectedFile 
                  ? `Selected: ${selectedFile.name}` 
                  : 'Choose a JSON file or drag it here'
                }
              </p>
              <p className="text-sm text-white">
                Supports .json files up to 10MB (single objects or arrays)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
