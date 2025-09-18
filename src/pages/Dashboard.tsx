import { DataLoader } from "@/components/DataLoader";
import { ComplianceOverview } from "@/components/ComplianceOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Consumer Duty Compliance Dashboard</h1>
              <p className="text-muted-foreground">Financial Services Regulatory Monitoring System</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              System Ready
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Compliance Overview Cards */}
        <ComplianceOverview />

        {/* Data Ingestion Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Ingestion</h2>
            <p className="text-muted-foreground">Load compliance datasets to begin analysis</p>
          </div>
          <DataLoader />
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Compliance monitoring assistant operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Monitoring</span>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Data Validation</span>
                <Badge className="bg-success text-success-foreground">Ready</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Audit Logging</span>
                <Badge className="bg-success text-success-foreground">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Human Review Queue</span>
                <Badge variant="outline">Standby</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guardrail Notice */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              System-Level Guardrails Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This compliance monitoring assistant analyzes data and provides findings and recommendations. 
              It will not take direct actions such as modifying products or contacting customers. 
              All issues identified are flagged for human review. Analysis is grounded in provided datasets only.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}