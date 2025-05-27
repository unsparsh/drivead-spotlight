
export interface CampaignRequest {
  id: string;
  advertiser_id: string;
  company_name: string;
  company_location: string;
  email: string;
  phone: string;
  requester_name: string;
  requester_role: string;
  vehicle_type: string;
  duration: number;
  banner_details: string;
  created_at: string;
  status: string;
  admin_notes?: string;
  total_amount: number;
}

export interface Campaign {
  id: string;
  name: string;
  company: string;
  vehicle_type?: string;
  daily_rate: number;
  description?: string;
  available_count?: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  advertiser_id?: string;
  campaign_details?: string;
  count: number;
}
