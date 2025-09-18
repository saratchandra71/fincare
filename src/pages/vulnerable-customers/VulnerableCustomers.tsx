import { VulnerabilityFileUpload } from '@/components/VulnerabilityFileUpload';
import { useVulnerability } from '@/contexts/VulnerabilityContext';

export default function VulnerableCustomers() {
  const { isValidated } = useVulnerability();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Vulnerable Customers
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Upload and analyze customer vulnerability data to identify at-risk customers
          </p>
        </div>

        <VulnerabilityFileUpload />

        {!isValidated && (
          <div className="mt-8 text-center text-muted-foreground">
            <p>Please upload the vulnerability dataset to access analysis features.</p>
          </div>
        )}
      </div>
    </div>
  );
}