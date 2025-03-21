import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CampaignRequest, Campaign } from '@/types/Campaign';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle, AlertTriangle, Clock, IndianRupee, Edit } from 'lucide-react';

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  
  const [campaignRequests, setCampaignRequests] = useState<CampaignRequest[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  const [selectedRequest, setSelectedRequest] = useState<CampaignRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    count: 5,
    adminNotes: '',
  });
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAuthenticated) {
        navigate('/auth');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user?.id)
          .single();
        
        if (error) throw error;
        
        if (!data.is_admin) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Error",
          description: "Could not verify admin privileges.",
          variant: "destructive",
        });
        navigate('/');
      }
    };
    
    checkAdminStatus();
  }, [isAuthenticated, navigate, toast, user]);
  
  useEffect(() => {
    const fetchCampaignRequests = async () => {
      if (!isAdmin) return;
      
      try {
        setRequestsLoading(true);
        const { data, error } = await supabase
          .from('campaign_requests')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setCampaignRequests(data || []);
      } catch (error: any) {
        console.error('Error fetching campaign requests:', error);
        toast({
          title: "Error",
          description: "Could not load campaign requests.",
          variant: "destructive",
        });
      } finally {
        setRequestsLoading(false);
      }
    };
    
    fetchCampaignRequests();
  }, [isAdmin, toast]);
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!isAdmin) return;
      
      try {
        setCampaignsLoading(true);
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setCampaigns(data || []);
      } catch (error: any) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: "Error",
          description: "Could not load campaigns.",
          variant: "destructive",
        });
      } finally {
        setCampaignsLoading(false);
      }
    };
    
    fetchCampaigns();
  }, [isAdmin, toast]);
  
  const handleReviewClick = (request: CampaignRequest) => {
    setSelectedRequest(request);
    setFormData({
      name: `${request.company_name} Campaign`,
      count: 5,
      adminNotes: request.admin_notes || '',
    });
    setReviewDialogOpen(true);
  };
  
  const handleRejectClick = (request: CampaignRequest) => {
    setSelectedRequest(request);
    setFormData({
      ...formData,
      adminNotes: request.admin_notes || '',
    });
    setRejectDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFormData(prev => ({ ...prev, count: value }));
    }
  };
  
  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      const { error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          name: formData.name,
          company: selectedRequest.company_name,
          count: formData.count,
          daily_rate: selectedRequest.vehicle_type === 'auto' ? 70 : 100,
          is_verified: true,
          campaign_details: selectedRequest.banner_details,
          advertiser_id: selectedRequest.advertiser_id
        });
      
      if (campaignError) throw campaignError;
      
      const { error: updateError } = await supabase
        .from('campaign_requests')
        .update({
          status: 'approved',
          admin_notes: formData.adminNotes
        })
        .eq('id', selectedRequest.id);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Campaign Approved",
        description: "The campaign has been approved and is now live.",
      });
      
      setCampaignRequests(prev => 
        prev.map(req => 
          req.id === selectedRequest.id 
            ? { ...req, status: 'approved', admin_notes: formData.adminNotes } 
            : req
        )
      );
      
      const { data: updatedCampaigns } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      setCampaigns(updatedCampaigns || []);
      
      setReviewDialogOpen(false);
    } catch (error: any) {
      console.error('Error approving campaign:', error);
      toast({
        title: "Error",
        description: "Could not approve campaign. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleReject = async () => {
    if (!selectedRequest) return;
    
    try {
      const { error } = await supabase
        .from('campaign_requests')
        .update({
          status: 'rejected',
          admin_notes: formData.adminNotes
        })
        .eq('id', selectedRequest.id);
      
      if (error) throw error;
      
      toast({
        title: "Campaign Rejected",
        description: "The campaign request has been rejected.",
      });
      
      setCampaignRequests(prev => 
        prev.map(req => 
          req.id === selectedRequest.id 
            ? { ...req, status: 'rejected', admin_notes: formData.adminNotes } 
            : req
        )
      );
      
      setRejectDialogOpen(false);
    } catch (error: any) {
      console.error('Error rejecting campaign:', error);
      toast({
        title: "Error",
        description: "Could not reject campaign. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleVerifyChange = async (campaign: Campaign, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          is_verified: newStatus
        })
        .eq('id', campaign.id);
      
      if (error) throw error;
      
      toast({
        title: newStatus ? "Campaign Verified" : "Campaign Hidden",
        description: newStatus 
          ? "The campaign is now visible to vehicle owners." 
          : "The campaign is now hidden from vehicle owners.",
      });
      
      setCampaigns(prev => 
        prev.map(c => 
          c.id === campaign.id 
            ? { ...c, is_verified: newStatus } 
            : c
        )
      );
    } catch (error: any) {
      console.error('Error updating campaign status:', error);
      toast({
        title: "Error",
        description: "Could not update campaign status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Clock className="w-3 h-3 mr-1" />Pending
        </span>;
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3 mr-1" />Approved
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="w-3 h-3 mr-1" />Rejected
        </span>;
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Clock className="w-12 h-12 animate-pulse text-driveAd-purple mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
            
            <Tabs defaultValue="requests" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="requests">Campaign Requests</TabsTrigger>
                <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requests">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Campaign Requests</h2>
                
                {requestsLoading ? (
                  <div className="text-center py-10">
                    <Clock className="w-10 h-10 animate-pulse text-driveAd-purple mx-auto mb-4" />
                    <p>Loading requests...</p>
                  </div>
                ) : campaignRequests.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1 dark:text-white">No Campaign Requests</h3>
                    <p className="text-gray-600 dark:text-gray-400">There are no pending campaign requests at this time.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table>
                      <TableCaption>List of all campaign requests from advertisers</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Vehicle Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaignRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.company_name}</TableCell>
                            <TableCell>{request.vehicle_type === 'auto' ? 'Auto Rickshaw' : 'Car/Cab'}</TableCell>
                            <TableCell>{request.duration} days</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <span className="flex items-center">
                                <IndianRupee className="w-3 h-3 mr-1" />
                                {request.total_amount}
                              </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{formatDate(request.created_at)}</TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                            <TableCell className="text-right">
                              {request.status === 'pending' ? (
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    onClick={() => handleReviewClick(request)}
                                    variant="outline" 
                                    size="sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                  <Button 
                                    onClick={() => handleRejectClick(request)}
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {request.status === 'approved' ? 'Approved' : 'Rejected'}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="campaigns">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Active Campaigns</h2>
                
                {campaignsLoading ? (
                  <div className="text-center py-10">
                    <Clock className="w-10 h-10 animate-pulse text-driveAd-purple mx-auto mb-4" />
                    <p>Loading campaigns...</p>
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1 dark:text-white">No Active Campaigns</h3>
                    <p className="text-gray-600 dark:text-gray-400">There are no active campaigns at this time.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table>
                      <TableCaption>List of all campaigns in the system</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Available</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.company}</TableCell>
                            <TableCell>
                              <span className="flex items-center">
                                <IndianRupee className="w-3 h-3 mr-1" />
                                {campaign.daily_rate}/day
                              </span>
                            </TableCell>
                            <TableCell>{campaign.count}</TableCell>
                            <TableCell>
                              {campaign.is_verified ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  <CheckCircle className="w-3 h-3 mr-1" />Visible
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                                  <XCircle className="w-3 h-3 mr-1" />Hidden
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {campaign.is_verified ? (
                                  <Button 
                                    onClick={() => handleVerifyChange(campaign, false)}
                                    variant="outline" 
                                    size="sm"
                                    className="text-gray-500 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Hide
                                  </Button>
                                ) : (
                                  <Button 
                                    onClick={() => handleVerifyChange(campaign, true)}
                                    variant="outline" 
                                    size="sm"
                                    className="text-green-500 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950/20"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Show
                                  </Button>
                                )}
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Campaign Request</DialogTitle>
            <DialogDescription>
              Review and approve this campaign to make it available for vehicle owners.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="count">Available Slots</Label>
              <Input
                id="count"
                name="count"
                type="number"
                min="1"
                value={formData.count}
                onChange={handleCountChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Number of vehicle banners available for this campaign
              </p>
            </div>
            
            <div>
              <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
              <Textarea
                id="adminNotes"
                name="adminNotes"
                value={formData.adminNotes}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Add any notes about this campaign approval"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white">
              Approve Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Campaign Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this campaign request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Label htmlFor="rejectNotes">Rejection Reason (Optional)</Label>
            <Textarea
              id="rejectNotes"
              name="adminNotes"
              value={formData.adminNotes}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Explain why this campaign is being rejected"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white">
              Reject Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;
