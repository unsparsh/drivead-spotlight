
import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { toast } = useToast()
  
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [isAdvertiser, setIsAdvertiser] = useState(false)
  const [isVehicleOwner, setIsVehicleOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const appUrl = window.location.origin
      console.log("Signup attempt for:", signupMethod === "email" ? email : phone)
      console.log("Redirect URL:", `${appUrl}/auth/callback`)
      
      const { data, error } = await supabase.auth.signUp({
        [signupMethod]: signupMethod === "email" ? email : phone,
        password,
        options: {
          emailRedirectTo: `${appUrl}/auth/callback`,
          data: {
            full_name: fullName,
            username,
          }
        }
      })
      
      if (error) throw error

      if (data.user) {
        console.log("User created, updating profile:", data.user.id)
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            username,
            full_name: fullName,
            phone: signupMethod === "phone" ? phone : null,
            is_advertiser: isAdvertiser,
            is_vehicle_owner: isVehicleOwner,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.user.id)

        if (profileError) {
          console.error("Error updating profile:", profileError)
        }
        
        if (data.session) {
          console.log("Session created - confirmation not required")
        } else {
          console.log("No session - confirmation required")
          setSignupSuccess(true)
        }
      }
      
      toast({
        title: "Account created!",
        description: signupMethod === "email" 
          ? "Please check your email to confirm your account"
          : "Please verify your phone number to continue",
      })

      setSignupSuccess(true)
      
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to create account")
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true)
      setError(null)
      
      // Get the current app URL for redirects
      const appUrl = window.location.origin
      const redirectUrl = `${appUrl}/auth/callback`
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      
      if (error) throw error
      
    } catch (error: any) {
      setError(error.message || "Failed to sign up with Google")
      toast({
        title: "Google Sign Up Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {signupSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md">
          <h3 className="font-medium">Account created successfully!</h3>
          {signupMethod === "email" ? (
            <>
              <p className="text-sm mt-1">
                Please check your email at <strong>{email}</strong> for a confirmation link.
              </p>
              <p className="text-sm mt-2">
                If you don't see the email within a few minutes, please check your spam folder.
              </p>
            </>
          ) : (
            <p className="text-sm mt-1">
              Please check your phone <strong>{phone}</strong> for a verification code.
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <Tabs defaultValue="email" onValueChange={(value) => setSignupMethod(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1234567890"
                    type="tel"
                    autoCapitalize="none"
                    autoComplete="tel"
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isLoading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              <p className="text-sm text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Label>Account Type</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_advertiser" 
                    checked={isAdvertiser}
                    onCheckedChange={(checked) => setIsAdvertiser(checked === true)}
                  />
                  <Label 
                    htmlFor="is_advertiser" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    I am an Advertiser
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_vehicle_owner" 
                    checked={isVehicleOwner}
                    onCheckedChange={(checked) => setIsVehicleOwner(checked === true)}
                  />
                  <Label 
                    htmlFor="is_vehicle_owner" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    I am a Vehicle Owner
                  </Label>
                </div>
              </div>
            </div>

            <Button className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
            </Button>
          </div>
        </form>
      )}
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className="dark:border-gray-700"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        Google
      </Button>
    </div>
  )
}
