import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataLoader } from "@/components/DataLoader";
import { DatasetViewer } from "@/components/DatasetViewer";
import { ConsumerDutyKPIDashboard } from "@/components/kpi/ConsumerDutyKPIDashboard";
import { ProductsServicesAnalysis } from "@/components/analysis/ProductsServicesAnalysis";
import { PriceValueAnalysis } from "@/components/analysis/PriceValueAnalysis";
import { ConsumerUnderstandingAnalysis } from "@/components/analysis/ConsumerUnderstandingAnalysis";
import { ConsumerSupportAnalysis } from "@/components/analysis/ConsumerSupportAnalysis";
import { useData } from "@/contexts/DataContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ConsumerDuty() {
  const { allDatasetsLoaded } = useData();

  const DatasetLoadingGuard = ({ children }: { children: React.ReactNode }) => {
    if (!allDatasetsLoaded) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Datasets are not yet loaded. Please load all required datasets to proceed with analysis.
          </AlertDescription>
        </Alert>
      );
    }
    return <>{children}</>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Consumer Duty</h1>
        <p className="text-muted-foreground">Monitor compliance across all Consumer Duty outcomes</p>
      </div>

      <Tabs defaultValue="datasets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="stats">Consumer Duty Stats</TabsTrigger>
          <TabsTrigger value="products-services">Products & Services</TabsTrigger>
          <TabsTrigger value="price-value">Price & Value</TabsTrigger>
          <TabsTrigger value="understanding">Consumer Understanding</TabsTrigger>
          <TabsTrigger value="support">Consumer Support</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Dataset Loading</h2>
              <p className="text-muted-foreground mb-6">
                Load the following datasets into memory for Consumer Duty compliance analysis:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
                <li><strong>ProductPerformance.csv</strong> as ProductData</li>
                <li><strong>PriceValue.csv</strong> as PricingData</li>
                <li><strong>ConsumerUnderstanding.csv</strong> as CommData</li>
                <li><strong>ConsumerSupport.csv</strong> as SupportData</li>
              </ul>
              <DataLoader />
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">Dataset Display</h2>
              <p className="text-muted-foreground mb-6">
                View loaded datasets in table format with full scrolling support
              </p>
              <DatasetViewer />
            </section>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <DatasetLoadingGuard>
            <ConsumerDutyKPIDashboard />
          </DatasetLoadingGuard>
        </TabsContent>

        <TabsContent value="products-services">
          <DatasetLoadingGuard>
            <ProductsServicesAnalysis />
          </DatasetLoadingGuard>
        </TabsContent>

        <TabsContent value="price-value">
          <DatasetLoadingGuard>
            <PriceValueAnalysis />
          </DatasetLoadingGuard>
        </TabsContent>

        <TabsContent value="understanding">
          <DatasetLoadingGuard>
            <ConsumerUnderstandingAnalysis />
          </DatasetLoadingGuard>
        </TabsContent>

        <TabsContent value="support">
          <DatasetLoadingGuard>
            <ConsumerSupportAnalysis />
          </DatasetLoadingGuard>
        </TabsContent>
      </Tabs>
    </div>
  );
}