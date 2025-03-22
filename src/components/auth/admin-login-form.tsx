
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminLoginForm({ className, ...props }: AdminLoginFormProps) {
  const { loginAsAdmin, isLoading, error } = useAdminAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    await loginAsAdmin(email, password);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input
              id="admin-email"
              placeholder="admin@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-driveAd-purple/30"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="admin-password">Admin Password</Label>
            </div>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-driveAd-purple/30"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Admin Login
          </Button>
        </div>
      </form>
    </div>
  );
}
