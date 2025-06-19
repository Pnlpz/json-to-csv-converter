
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ProcessingStatusProps {
  isVisible: boolean;
}

export const ProcessingStatus = ({ isVisible }: ProcessingStatusProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center space-x-4 p-6 bg-green-50 rounded-lg border border-green-200">
      <CheckCircle className="h-6 w-6 text-green-600" />
      <span className="text-green-800 font-medium">
        File processed successfully! Ready to download CSV.
      </span>
      <ArrowRight className="h-5 w-5 text-green-600" />
    </div>
  );
};
