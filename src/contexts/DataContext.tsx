import { createContext, useContext, useState, ReactNode } from 'react';

interface DataStatus {
  name: string;
  filename: string;
  loaded: boolean;
  loading: boolean;
  error?: string;
  dataCount?: number;
}

interface DataContextType {
  datasets: DataStatus[];
  setDatasets: React.Dispatch<React.SetStateAction<DataStatus[]>>;
  allDatasetsLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [datasets, setDatasets] = useState<DataStatus[]>([
    { name: "ProductData", filename: "ProductPerformance.csv", loaded: false, loading: false },
    { name: "PricingData", filename: "PriceValue.csv", loaded: false, loading: false },
    { name: "CommData", filename: "ConsumerUnderstanding.csv", loaded: false, loading: false },
    { name: "SupportData", filename: "ConsumerSupport.csv", loaded: false, loading: false },
  ]);

  const allDatasetsLoaded = datasets.every(d => d.loaded && !d.error);

  return (
    <DataContext.Provider value={{ datasets, setDatasets, allDatasetsLoaded }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}