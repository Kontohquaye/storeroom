import { auth } from "@/auth";
import AccountForm from "@/components/AccountForm";
import { SiteHeader } from "@/components/PageHeader";
import PaystackButton from "@/components/PayStackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAvatarFallback } from "@/lib/utils";

const ProfilePage = async () => {
  const session = await auth();
  // console.log(session);
  return (
    <div className="container max-w-full">
      <SiteHeader heading="Account Profile" />
      <div className="header">
        <header className="flex justify-between items-center">
          <div className="flex item-center  gap-1.5">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={session?.user?.image || ""}
                alt="profile image"
              />
              <AvatarFallback>
                {getAvatarFallback(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="other text-sm">
              <p>{session?.user?.name}</p>
              <p className="text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          <div className="subscripton flex items-center gap-2">
            <p>subscription:</p>
            <Badge>active</Badge>
          </div>
        </header>
      </div>
      {/* Billing */}

      <div className="edit">
        <AccountForm />
        <PaystackButton />
      </div>
    </div>
  );
};

export default ProfilePage;
