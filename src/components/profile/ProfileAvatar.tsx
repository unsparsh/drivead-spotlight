
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl: string | null;
  initials: string;
  size?: "sm" | "md" | "lg";
}

const ProfileAvatar = ({ avatarUrl, initials, size = "md" }: ProfileAvatarProps) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-24 w-24"
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={avatarUrl || undefined} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
