import { ConsumerUnderstandingAnalysis } from "@/components/analysis/ConsumerUnderstandingAnalysis";
import { useData } from "@/contexts/DataContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ConsumerUnderstandingAnalysisPage() {
  const { allDatasetsLoaded } = useData();

  if (!allDatasetsLoaded) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Consumer Understanding Analysis</h1>
          <p className="text-muted-foreground">Analysis of communication effectiveness and consumer comprehension</p>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Datasets are not yet loaded. Please load all required datasets to proceed with analysis.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Consumer Understanding Analysis</h1>
        <p className="text-muted-foreground">Analysis of communication effectiveness and consumer comprehension</p>
      </div>
      <ConsumerUnderstandingAnalysis />
    </div>
  );
}