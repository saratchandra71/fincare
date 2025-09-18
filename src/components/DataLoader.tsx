import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

export function DataLoader() {
  const { toast } = useToast();
  const { datasets, setDatasets } = useData();

  const loadDataset = async (index: number) => {
    const dataset = datasets[index];
    setDatasets(prev => prev.map((d, i) => i === index ? { ...d, loading: true, error: undefined } : d));

    try {
      const response = await fetch(`/data/${dataset.filename}`);
      if (!response.ok) throw new Error(`Failed to load ${dataset.filename}`);
      
      const text = await response.text();
      const lines = text.trim().split('\n');
      const dataCount = lines.length - 1; // Exclude header

      setDatasets(prev => prev.map((d, i) => 
        i === index ? { ...d, loaded: true, loading: false, dataCount } : d
      ));

      toast({
        title: "Dataset Loaded",
        description: `${dataset.name} loaded successfully with ${dataCount} records.`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setDatasets(prev => prev.map((d, i) => 
        i === index ? { ...d, loading: false, error: errorMessage } : d
      ));

      toast({
        title: "Load Failed",
        description: `Failed to load ${dataset.name}: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const loadAllDatasets = async () => {
    for (let i = 0; i < datasets.length; i++) {
      if (!datasets[i].loaded) {
        await loadDataset(i);
        // Small delay between loads
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // Check if all loaded successfully
    setTimeout(() => {
      const allLoaded = datasets.every(d => d.loaded);
      if (allLoaded) {
        toast({
          title: "All Datasets Loaded Successfully",
          description: "All datasets have been loaded without any problems. The system is ready for analysis.",
        });
      }
    }, 1000);
  };

  const allLoaded = datasets.every(d => d.loaded);
  const anyLoading = datasets.some(d => d.loading);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Ingestion Control Panel
        </CardTitle>
        <CardDescription>
          Load the following datasets into memory for Consumer Duty analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {datasets.map((dataset, index) => (
            <div key={dataset.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {dataset.loaded ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : dataset.error ? (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <Database className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{dataset.filename}</p>
                    <p className="text-sm text-muted-foreground">Load as {dataset.name}</p>
                  </div>
                </div>
                {dataset.loaded && (
                  <Badge variant="secondary" className="ml-2">
                    {dataset.dataCount} records
                  </Badge>
                )}
                {dataset.error && (
                  <Badge variant="destructive" className="ml-2">
                    Error
                  </Badge>
                )}
              </div>
              <Button
                onClick={() => loadDataset(index)}
                disabled={dataset.loaded || dataset.loading || anyLoading}
                size="sm"
                variant={dataset.loaded ? "secondary" : "default"}
              >
                {dataset.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : dataset.loaded ? (
                  "Loaded"
                ) : (
                  "Load Dataset"
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {allLoaded ? "All datasets loaded successfully" : `${datasets.filter(d => d.loaded).length}/${datasets.length} datasets loaded`}
          </div>
          <Button
            onClick={loadAllDatasets}
            disabled={allLoaded || anyLoading}
            className="bg-primary hover:bg-primary-hover"
          >
            {anyLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading All...
              </>
            ) : allLoaded ? (
              "All Loaded"
            ) : (
              "Load All Datasets"
            )}
          </Button>
        </div>

        {allLoaded && (
          <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-success font-medium">✓ Datasets have been loaded successfully</p>
            <p className="text-sm text-muted-foreground mt-1">
              All datasets are now available for Consumer Duty compliance analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}