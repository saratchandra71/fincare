import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataLoader } from "@/components/DataLoader";
import { ConsumerDutyKPIDashboard } from "@/components/kpi/ConsumerDutyKPIDashboard";
import { ProductsServicesAnalysis } from "@/components/analysis/ProductsServicesAnalysis";
import { PriceValueAnalysis } from "@/components/analysis/PriceValueAnalysis";
import { ConsumerUnderstandingAnalysis } from "@/components/analysis/ConsumerUnderstandingAnalysis";
import { ConsumerSupportAnalysis } from "@/components/analysis/ConsumerSupportAnalysis";

export default function ConsumerDuty() {
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
          <DataLoader />
        </TabsContent>

        <TabsContent value="stats">
          <ConsumerDutyKPIDashboard />
        </TabsContent>

        <TabsContent value="products-services">
          <ProductsServicesAnalysis />
        </TabsContent>

        <TabsContent value="price-value">
          <PriceValueAnalysis />
        </TabsContent>

        <TabsContent value="understanding">
          <ConsumerUnderstandingAnalysis />
        </TabsContent>

        <TabsContent value="support">
          <ConsumerSupportAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}