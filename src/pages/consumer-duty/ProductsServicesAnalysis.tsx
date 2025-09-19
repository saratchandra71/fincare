import { ProductsServicesAnalysis } from "@/components/analysis/ProductsServicesAnalysis";
import { useData } from "@/contexts/DataContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ProductsServicesAnalysisPage() {
  const { allDatasetsLoaded } = useData();

  if (!allDatasetsLoaded) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Products & Services Analysis</h1>
          <p className="text-muted-foreground">Analysis of product performance and consumer outcomes</p>
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
        <h1 className="text-3xl font-bold">Products & Services Analysis</h1>
        <p className="text-muted-foreground">Analysis of product performance and consumer outcomes</p>
      </div>
      <ProductsServicesAnalysis />
    </div>
  );
}