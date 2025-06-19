
import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileProcessed: (data: any, fileName: string) => void;
}

export const FileUpload = ({ onFileProcessed }: FileUploadProps) => {
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

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      onFileProcessed(data, file.name);
      toast.success('JSON file processed successfully!');
    } catch (error) {
      toast.error('Error parsing JSON file');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
  );
};
