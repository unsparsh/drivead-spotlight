
import { useState } from 'react';
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
import { useCampaignRequests, useActiveCampaigns } from '@/hooks/useAdminCampaigns';

const AdminPage = () => {
  // Use React Query hooks for data fetching
  const { 
    data: campaignRequests = [], 
    isLoading: requestsLoading,
    refetch: refetchRequests
  } = useCampaignRequests();
  
  const { 
    data: campaigns = [], 
    isLoading: campaignsLoading,
    refetch: refetchCampaigns
  } = useActiveCampaigns();

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
                    refreshData={() => {
                      refetchRequests();
                      refetchCampaigns();
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="campaigns">
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Active Campaigns</h2>
                  <ActiveCampaignsTable
                    campaigns={campaigns}
                    loading={campaignsLoading}
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
