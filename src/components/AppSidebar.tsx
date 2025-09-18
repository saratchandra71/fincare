import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  BarChart3,
  FileCheck,
  Shield,
  HelpCircle,
  DollarSign,
  MessageSquare,
  HeartHandshake,
  Users,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  Database,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [consumerDutyOpen, setConsumerDutyOpen] = useState(true);
  const [auditOpen, setAuditOpen] = useState(false);
  const [promptsOpen, setPromptsOpen] = useState(false);

  const isCollapsed = state === "collapsed";

  const consumerDutyItems = [
    { title: "Products & Services", url: "/consumer-duty/products-services", icon: FileCheck },
    { title: "Price & Value", url: "/consumer-duty/price-value", icon: DollarSign },
    { title: "Consumer Understanding", url: "/consumer-duty/understanding", icon: MessageSquare },
    { title: "Consumer Support", url: "/consumer-duty/support", icon: HeartHandshake },
  ];

  const auditItems = [
    { title: "Audit Log", url: "/audit/log", icon: FileText },
    { title: "Audit Trail", url: "/audit/trail", icon: BarChart3 },
    { title: "Audit Report", url: "/audit/report", icon: FileCheck },
  ];

  const promptItems = [
    { title: "Prompt Library", url: "/prompts/library", icon: Settings },
    { title: "Prompt Log", url: "/prompts/log", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (paths: string[]) => paths.some(path => location.pathname === path);

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="px-2">
        {/* Datasets Section */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={isActive("/datasets") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                <Link to="/datasets">
                  <Database className="mr-2 h-4 w-4" />
                  {!isCollapsed && <span>Datasets</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Consumer Duty Section */}
        <SidebarGroup>
          <Collapsible open={consumerDutyOpen} onOpenChange={setConsumerDutyOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between p-2 hover:bg-secondary">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {!isCollapsed && <span>Consumer Duty</span>}
                </div>
                {!isCollapsed && (consumerDutyOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="ml-4">
                <SidebarMenu>
                  {consumerDutyItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                        <Link to={item.url}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Vulnerable Customers Section */}
        <SidebarGroup>
          <Collapsible open={auditOpen} onOpenChange={setAuditOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between p-2 hover:bg-secondary">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {!isCollapsed && <span>Vulnerable Customers</span>}
                </div>
                {!isCollapsed && (auditOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="ml-4">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActive("/vulnerable-customers") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                      <Link to="/vulnerable-customers">Upload Data</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActive("/vulnerable-customers/stats") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                      <Link to="/vulnerable-customers/stats">Vulnerability Stats</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActive("/vulnerable-customers/list") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                      <Link to="/vulnerable-customers/list">Customer List</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Audit Reports Section */}
        <SidebarGroup>
          <Collapsible open={auditOpen} onOpenChange={setAuditOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between p-2 hover:bg-secondary">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {!isCollapsed && <span>Audit Reports/Logs</span>}
                </div>
                {!isCollapsed && (auditOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="ml-4">
                <SidebarMenu>
                  {auditItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                        <Link to={item.url}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Prompts Section */}
        <SidebarGroup>
          <Collapsible open={promptsOpen} onOpenChange={setPromptsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between p-2 hover:bg-secondary">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  {!isCollapsed && <span>Prompts</span>}
                </div>
                {!isCollapsed && (promptsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="ml-4">
                <SidebarMenu>
                  {promptItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}>
                        <Link to={item.url}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}