import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card className="bg-slate-200 dark:bg-slate-800/90 w-[500px]">
      <CardHeader>
        <CardTitle>Welcome to MELLO</CardTitle>
        <CardDescription>Authenticate yourself to continue</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
