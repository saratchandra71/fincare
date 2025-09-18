import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { DataProvider } from "@/contexts/DataContext";
import Dashboard from "./pages/Dashboard";
import ProductsServices from "./pages/consumer-duty/ProductsServices";
import PriceValue from "./pages/consumer-duty/PriceValue";
import ConsumerUnderstanding from "./pages/consumer-duty/ConsumerUnderstanding";
import ConsumerSupport from "./pages/consumer-duty/ConsumerSupport";
import AuditLog from "./pages/audit/AuditLog";
import AuditTrail from "./pages/audit/AuditTrail";
import AuditReport from "./pages/audit/AuditReport";
import PromptLibrary from "./pages/prompts/PromptLibrary";
import PromptLog from "./pages/prompts/PromptLog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b bg-card/50 backdrop-blur-sm">
                <SidebarTrigger className="ml-4" />
                <div className="ml-4">
                  <h1 className="text-lg font-semibold">Consumer Duty Compliance Dashboard</h1>
                </div>
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* Consumer Duty Routes */}
                  <Route path="/consumer-duty/products-services" element={<ProductsServices />} />
                  <Route path="/consumer-duty/price-value" element={<PriceValue />} />
                  <Route path="/consumer-duty/understanding" element={<ConsumerUnderstanding />} />
                  <Route path="/consumer-duty/support" element={<ConsumerSupport />} />
                  
                  {/* Other Routes */}
                  <Route path="/vulnerable-customers" element={<div className="p-6">Vulnerable Customers</div>} />
                  <Route path="/audit/log" element={<AuditLog />} />
                  <Route path="/audit/trail" element={<AuditTrail />} />
                  <Route path="/audit/report" element={<AuditReport />} />
                  <Route path="/prompts/library" element={<PromptLibrary />} />
                  <Route path="/prompts/log" element={<PromptLog />} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
