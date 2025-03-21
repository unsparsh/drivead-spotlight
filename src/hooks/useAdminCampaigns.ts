
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Campaign, CampaignRequest } from '@/types/Campaign';
import { useToast } from './use-toast';

// Fetch campaign requests
export const useCampaignRequests = () => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['campaign-requests'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('campaign_requests')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return data as CampaignRequest[];
      } catch (error: any) {
        toast({
          title: "Error fetching campaign requests",
          description: error.message || "Failed to load campaign requests",
          variant: "destructive",
        });
        throw error;
      }
    }
  });
};

// Fetch active campaigns
export const useActiveCampaigns = () => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['active-campaigns'],
    queryFn: async () => {
      try {
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
        
        return transformedData || [];
      } catch (error: any) {
        toast({
          title: "Error fetching campaigns",
          description: error.message || "Failed to load campaigns",
          variant: "destructive",
        });
        throw error;
      }
    }
  });
};

// Approve campaign request
export const useApproveCampaign = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      formData, 
      selectedRequest 
    }: { 
      formData: { name: string; count: number; adminNotes: string; }; 
      selectedRequest: CampaignRequest 
    }) => {
      // Insert new campaign
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
      
      // Update campaign request status
      const { error: updateError } = await supabase
        .from('campaign_requests')
        .update({
          status: 'approved',
          admin_notes: formData.adminNotes
        })
        .eq('id', selectedRequest.id);
      
      if (updateError) throw updateError;
      
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Campaign Approved",
        description: "The campaign has been approved and is now live.",
      });
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
      queryClient.invalidateQueries({ queryKey: ['active-campaigns'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Could not approve campaign. Please try again.",
        variant: "destructive",
      });
    }
  });
};

// Reject campaign request
export const useRejectCampaign = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      formData, 
      selectedRequest 
    }: { 
      formData: { adminNotes: string }; 
      selectedRequest: CampaignRequest 
    }) => {
      const { error } = await supabase
        .from('campaign_requests')
        .update({
          status: 'rejected',
          admin_notes: formData.adminNotes
        })
        .eq('id', selectedRequest.id);
      
      if (error) throw error;
      
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Campaign Rejected",
        description: "The campaign request has been rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Could not reject campaign. Please try again.",
        variant: "destructive",
      });
    }
  });
};

// Update campaign verification status
export const useUpdateCampaignVerification = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      campaignId, 
      isVerified 
    }: { 
      campaignId: string; 
      isVerified: boolean 
    }) => {
      const { error } = await supabase
        .from('campaigns')
        .update({
          is_verified: isVerified
        })
        .eq('id', campaignId);
      
      if (error) throw error;
      
      return { success: true, isVerified };
    },
    onSuccess: (_, variables) => {
      toast({
        title: variables.isVerified ? "Campaign Verified" : "Campaign Hidden",
        description: variables.isVerified 
          ? "The campaign is now visible to vehicle owners." 
          : "The campaign is now hidden from vehicle owners.",
      });
      queryClient.invalidateQueries({ queryKey: ['active-campaigns'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Could not update campaign status. Please try again.",
        variant: "destructive",
      });
    }
  });
};
