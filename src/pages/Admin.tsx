
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CampaignRequest, Campaign } from '@/types/Campaign';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminAuth from '@/components/admin/AdminAuth';
import { CampaignRequestsTable } from '@/components/admin/CampaignRequestsTable';
import { ActiveCampaignsTable } from '@/components/admin/ActiveCampaignsTable';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminPage = () => {
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  
  const [campaignRequests, setCampaignRequests] = useState<CampaignRequest[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  // Fetch campaign requests
  useEffect(() => {
    const fetchCampaignRequests = async () => {
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
      } finally {
        setRequestsLoading(false);
      }
    };
    
    fetchCampaignRequests();
  }, []);
  
  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      setCampaignsLoading(true);
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const transformedData = data?.map(item => ({
        ...item,
        vehicle_type: '',  // Default empty string for required fields
        description: item.campaign_details || '',
        available_count: item.count
      })) as Campaign[];
      
      setCampaigns(transformedData || []);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setCampaignsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AdminAuth>
              <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
              
              <Tabs defaultValue="requests" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="requests">Campaign Requests</TabsTrigger>
                  <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
                </TabsList>
                
                <TabsContent value="requests">
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Campaign Requests</h2>
                  <CampaignRequestsTable
                    campaignRequests={campaignRequests}
                    loading={requestsLoading}
                    setCampaignRequests={setCampaignRequests}
                    refreshCampaigns={fetchCampaigns}
                  />
                </TabsContent>
                
                <TabsContent value="campaigns">
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Active Campaigns</h2>
                  <ActiveCampaignsTable
                    campaigns={campaigns}
                    loading={campaignsLoading}
                    setCampaigns={setCampaigns}
                  />
                </TabsContent>
              </Tabs>
            </AdminAuth>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
