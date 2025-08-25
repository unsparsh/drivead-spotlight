-- Create profiles for existing users and make one admin
INSERT INTO public.profiles (id, full_name, username, is_admin, is_advertiser, is_vehicle_owner, created_at, updated_at) 
VALUES 
  ('9f2048de-b30a-4862-98a4-0c1b1d35a35f', 'User 1', 'user1', false, false, false, now(), now()),
  ('a8f954e5-af26-45da-9be9-117768290711', 'Admin User', 'admin', true, false, false, now(), now())
ON CONFLICT (id) DO UPDATE SET
  is_admin = EXCLUDED.is_admin,
  full_name = EXCLUDED.full_name,
  username = EXCLUDED.username,
  updated_at = now();