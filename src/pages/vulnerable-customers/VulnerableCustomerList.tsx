import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Filter, X } from 'lucide-react';
import { useVulnerability, CustomerData, isCustomerVulnerable } from '@/contexts/VulnerabilityContext';
import { CustomerDetailsModal } from '@/components/CustomerDetailsModal';

export default function VulnerableCustomerList() {
  const { customersData, isValidated } = useVulnerability();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [filters, setFilters] = useState({
    productCategory: 'all',
    product: 'all',
    vulnerabilityScoreBand: 'all'
  });

  if (!isValidated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Data Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Please upload the vulnerability dataset to view customer list.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get vulnerable customers only - ensure we include all vulnerable customers
  const vulnerableCustomers = customersData.filter(isCustomerVulnerable);

  // Get unique values for filters
  const productCategories = ['Mortgages', 'Loans', 'Saver plans'];
  const scoreBands = ['50-60', '60-70', '70-80', '80-90', '90-100'];

  // Get products for selected category
  const availableProducts = useMemo(() => {
    if (filters.productCategory === 'all') return [];
    return [...new Set(
      vulnerableCustomers
        .filter(c => c['Product Category'] === filters.productCategory)
        .map(c => c.Product)
    )];
  }, [vulnerableCustomers, filters.productCategory]);

  // Apply filters
  const filteredCustomers = useMemo(() => {
    let filtered = vulnerableCustomers;

    if (filters.productCategory !== 'all') {
      filtered = filtered.filter(c => c['Product Category'] === filters.productCategory);
    }

    if (filters.product !== 'all') {
      filtered = filtered.filter(c => c.Product === filters.product);
    }

    if (filters.vulnerabilityScoreBand !== 'all') {
      const [min, max] = filters.vulnerabilityScoreBand.split('-').map(Number);
      filtered = filtered.filter(c => 
        c['Vulnerability Score'] && 
        c['Vulnerability Score'] >= min && 
        c['Vulnerability Score'] <= max
      );
    }

    // Sort by vulnerability score descending - handle missing scores
    return filtered.sort((a, b) => {
      const scoreA = a['Vulnerability Score'] || 0;
      const scoreB = b['Vulnerability Score'] || 0;
      return scoreB - scoreA;
    });
  }, [vulnerableCustomers, filters]);

  const clearFilters = () => {
    setFilters({
      productCategory: 'all',
      product: 'all',
      vulnerabilityScoreBand: 'all'
    });
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'destructive';
    if (score >= 80) return 'destructive';
    if (score >= 70) return 'secondary';
    if (score >= 60) return 'secondary';
    return 'outline';
  };

  const hasActiveFilters = filters.productCategory !== 'all' || 
                          filters.product !== 'all' || 
                          filters.vulnerabilityScoreBand !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Vulnerable Customer List
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            View and filter customers identified as vulnerable
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Product Category</label>
                <Select 
                  value={filters.productCategory} 
                  onValueChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    productCategory: value, 
                    product: 'all' // Reset product when category changes
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {productCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Product</label>
                <Select 
                  value={filters.product} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, product: value }))}
                  disabled={filters.productCategory === 'all'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    {availableProducts.map(product => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Vulnerability Score Band</label>
                <Select 
                  value={filters.vulnerabilityScoreBand} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, vulnerabilityScoreBand: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    {scoreBands.map(band => (
                      <SelectItem key={band} value={band}>
                        {band}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Vulnerable Customers ({filteredCustomers.length})</span>
              {hasActiveFilters && (
                <Badge variant="secondary">
                  Filtered from {vulnerableCustomers.length} total
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Vulnerability Score</TableHead>
                    <TableHead>Product Category</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer['Customer ID']}>
                      <TableCell className="font-mono">{customer['Customer ID']}</TableCell>
                      <TableCell className="font-medium">{customer['Customer Name']}</TableCell>
                      <TableCell>
                        {customer['Vulnerability Score'] ? (
                          <Badge variant={getScoreBadgeVariant(customer['Vulnerability Score'])}>
                            {customer['Vulnerability Score']}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{customer['Product Category']}</TableCell>
                      <TableCell>{customer.Product}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No vulnerable customers found matching the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Customer Details Modal */}
        {selectedCustomer && (
          <CustomerDetailsModal 
            customer={selectedCustomer}
            open={!!selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </div>
  );
}