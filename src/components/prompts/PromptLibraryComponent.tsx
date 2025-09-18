import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye, GripVertical, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptVersion {
  version: number;
  text: string;
  timestamp: Date;
  user: string;
  reason: string;
}

interface Prompt {
  id: string;
  name: string;
  category: string;
  text: string;
  versions: PromptVersion[];
  lastModified: Date;
  lastModifiedBy: string;
  order: number;
}

const PROMPT_CATEGORIES = [
  'Data Ingestion Prompts',
  'Outcome-based Analysis Prompts',
  'Audit Report/Logs Prompts',
  'System-Level Guardrail Prompts',
  'Custom Prompts'
];

export function PromptLibraryComponent() {
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [previewPrompt, setPreviewPrompt] = useState<Prompt | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    category: '',
    text: ''
  });

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = () => {
    // Sample prompts based on the provided requirements
    const samplePrompts: Prompt[] = [
      {
        id: 'p1',
        name: 'Data Ingestion Control',
        category: 'Data Ingestion Prompts',
        text: 'Load the following datasets into memory: ProductPerformance.csv as ProductData, PriceValue.csv as PricingData, ConsumerUnderstanding.csv as CommData, ConsumerSupport.csv as SupportData. When all datasets have been loaded without any problem, display a message that datasets have been loaded successfully.',
        versions: [
          {
            version: 1,
            text: 'Load the following datasets into memory: ProductPerformance.csv as ProductData, PriceValue.csv as PricingData, ConsumerUnderstanding.csv as CommData, ConsumerSupport.csv as SupportData. When all datasets have been loaded without any problem, display a message that datasets have been loaded successfully.',
            timestamp: new Date('2024-01-10T10:00:00'),
            user: 'System Admin',
            reason: 'Initial prompt creation'
          }
        ],
        lastModified: new Date('2024-01-10T10:00:00'),
        lastModifiedBy: 'System Admin',
        order: 1
      },
      {
        id: 'p2',
        name: 'Products & Services Analysis',
        category: 'Outcome-based Analysis Prompts',
        text: 'Analyze the Products & Services outcome using ProductData. For each product: 1. Compare Actual_Customer_Profile vs Target_Market_Profile. Flag any mismatch. 2. Flag Early_Closure_Rate > 10% as a potential mis-sale or dissatisfaction. 3. Flag Complaint_Count > 5 as a customer satisfaction issue. 4. If Vulnerable_Customer_proportion > 10% and any issue is found, highlight it as critical.',
        versions: [
          {
            version: 1,
            text: 'Analyze the Products & Services outcome using ProductData. For each product: 1. Compare Actual_Customer_Profile vs Target_Market_Profile. Flag any mismatch. 2. Flag Early_Closure_Rate > 10% as a potential mis-sale or dissatisfaction. 3. Flag Complaint_Count > 5 as a customer satisfaction issue. 4. If Vulnerable_Customer_proportion > 10% and any issue is found, highlight it as critical.',
            timestamp: new Date('2024-01-10T11:00:00'),
            user: 'Compliance Team',
            reason: 'Initial analysis framework'
          }
        ],
        lastModified: new Date('2024-01-10T11:00:00'),
        lastModifiedBy: 'Compliance Team',
        order: 1
      },
      {
        id: 'p3',
        name: 'System Guardrails',
        category: 'System-Level Guardrail Prompts',
        text: 'You are a compliance monitoring assistant for Consumer Duty. Your role is to analyze data and provide findings and recommendations. You will not take any direct action such as modifying products or contacting customers. All issues you identify should be flagged for human review. Use only the provided datasets and do not guess or fabricate information. If data is missing, say so. Always ground your outputs in actual values from the data.',
        versions: [
          {
            version: 1,
            text: 'You are a compliance monitoring assistant for Consumer Duty. Your role is to analyze data and provide findings and recommendations. You will not take any direct action such as modifying products or contacting customers. All issues you identify should be flagged for human review. Use only the provided datasets and do not guess or fabricate information. If data is missing, say so. Always ground your outputs in actual values from the data.',
            timestamp: new Date('2024-01-10T09:00:00'),
            user: 'System Admin',
            reason: 'Core system behavior definition'
          }
        ],
        lastModified: new Date('2024-01-10T09:00:00'),
        lastModifiedBy: 'System Admin',
        order: 1
      }
    ];
    
    setPrompts(samplePrompts);
  };

  const handleAddPrompt = () => {
    if (!newPrompt.name || !newPrompt.category || !newPrompt.text) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const prompt: Prompt = {
      id: `p${Date.now()}`,
      name: newPrompt.name,
      category: newPrompt.category,
      text: newPrompt.text,
      versions: [
        {
          version: 1,
          text: newPrompt.text,
          timestamp: new Date(),
          user: 'Current User',
          reason: 'Initial creation'
        }
      ],
      lastModified: new Date(),
      lastModifiedBy: 'Current User',
      order: prompts.filter(p => p.category === newPrompt.category).length + 1
    };

    setPrompts(prev => [...prev, prompt]);
    setNewPrompt({ name: '', category: '', text: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Prompt Added",
      description: `"${prompt.name}" has been added to the library.`,
    });
  };

  const handleEditPrompt = (prompt: Prompt) => {
    if (!editingPrompt) return;

    const newVersion: PromptVersion = {
      version: prompt.versions.length + 1,
      text: editingPrompt.text,
      timestamp: new Date(),
      user: 'Current User',
      reason: 'Manual edit'
    };

    const updatedPrompt = {
      ...prompt,
      name: editingPrompt.name,
      category: editingPrompt.category,
      text: editingPrompt.text,
      versions: [...prompt.versions, newVersion],
      lastModified: new Date(),
      lastModifiedBy: 'Current User'
    };

    setPrompts(prev => prev.map(p => p.id === prompt.id ? updatedPrompt : p));
    setEditingPrompt(null);
    
    toast({
      title: "Prompt Updated",
      description: `"${updatedPrompt.name}" has been updated.`,
    });
  };

  const handleDeletePrompt = (promptId: string) => {
    setPrompts(prev => prev.filter(p => p.id !== promptId));
    
    toast({
      title: "Prompt Deleted",
      description: "The prompt has been removed from the library.",
    });
  };

  const groupedPrompts = prompts.reduce((acc, prompt) => {
    if (!acc[prompt.category]) {
      acc[prompt.category] = [];
    }
    acc[prompt.category].push(prompt);
    return acc;
  }, {} as Record<string, Prompt[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prompt Library</h2>
          <p className="text-muted-foreground">
            Manage and version control all system prompts used for compliance analysis
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Prompt</DialogTitle>
              <DialogDescription>
                Create a new prompt for the compliance analysis system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newPrompt.name}
                    onChange={(e) => setNewPrompt(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Prompt name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newPrompt.category} onValueChange={(value) => setNewPrompt(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROMPT_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt Text</label>
                <Textarea
                  value={newPrompt.text}
                  onChange={(e) => setNewPrompt(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter the prompt text..."
                  rows={8}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPrompt}>
                Add Prompt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grouped Prompts */}
      <div className="space-y-6">
        {PROMPT_CATEGORIES.map(category => {
          const categoryPrompts = groupedPrompts[category] || [];
          if (categoryPrompts.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
                <CardDescription>
                  {categoryPrompts.length} prompt{categoryPrompts.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPrompts.map((prompt) => (
                    <div key={prompt.id} className="flex items-start gap-3 p-4 border rounded-lg">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-1 cursor-grab" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{prompt.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              v{prompt.versions.length}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreviewPrompt(prompt)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingPrompt({ ...prompt })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{prompt.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeletePrompt(prompt.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {prompt.text}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Modified: {prompt.lastModified.toLocaleDateString()}</span>
                          <span>By: {prompt.lastModifiedBy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewPrompt} onOpenChange={() => setPreviewPrompt(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewPrompt?.name}</DialogTitle>
            <DialogDescription>
              Preview how this prompt will be used in the agent workflow
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Current Version</h4>
              <p className="text-sm whitespace-pre-wrap">{previewPrompt?.text}</p>
            </div>
            <div className="p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium mb-2">Workflow Context</h4>
              <p className="text-sm text-muted-foreground">
                This prompt will be executed when the system processes {previewPrompt?.category.toLowerCase()} tasks.
                The agent will use this prompt to guide its analysis and ensure consistent compliance monitoring.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewPrompt(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingPrompt} onOpenChange={() => setEditingPrompt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Prompt</DialogTitle>
            <DialogDescription>
              Modify the prompt. Changes will be saved as a new version.
            </DialogDescription>
          </DialogHeader>
          {editingPrompt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingPrompt.name}
                    onChange={(e) => setEditingPrompt(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={editingPrompt.category} 
                    onValueChange={(value) => setEditingPrompt(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROMPT_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt Text</label>
                <Textarea
                  value={editingPrompt.text}
                  onChange={(e) => setEditingPrompt(prev => prev ? { ...prev, text: e.target.value } : null)}
                  rows={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPrompt(null)}>
              Cancel
            </Button>
            <Button onClick={() => editingPrompt && handleEditPrompt(prompts.find(p => p.id === editingPrompt.id)!)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}