import { FileText, CheckCircle, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      <Card className="text-center p-6 hover:shadow-lg transition-shadow">
        <div className="p-3 bg-zinc-800 rounded-full inline-block mb-4">
          <FileText className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Smart Conversion</h3>
        <p className="text-sm text-white">
          Automatically handles arrays, nested objects, and complex data structures
        </p>
      </Card>
      
      <Card className="text-center p-6 hover:shadow-lg transition-shadow">
        <div className="p-3 bg-zinc-800 rounded-full inline-block mb-4">
          <CheckCircle className="h-6 w-6 text-green-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Data Integrity</h3>
        <p className="text-sm text-white">
          Preserves data accuracy with proper escaping and formatting
        </p>
      </Card>
      
      <Card className="text-center p-6 hover:shadow-lg transition-shadow">
        <div className="p-3 bg-zinc-800 rounded-full inline-block mb-4">
          <Download className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Instant Download</h3>
        <p className="text-sm text-white">
          Process and download your converted files in seconds
        </p>
      </Card>
    </div>
  );
};
