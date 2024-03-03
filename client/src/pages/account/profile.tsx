import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../components/ui/skeleton";
import { Navigate } from "react-router-dom";
import { getProfileService } from "../../services/profile.service";
import UpdateProfileForm from "../../components/account/update-profile-form";
import cn from "../../utils/cn";

function ProfilePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
  });

  if (isLoading) return <Skeleton className="h-60" />;

  if (error) return <Navigate to={"/not-found"} />;

  return (
    <div>
      <h1 className="font-semibold">Profile</h1>
      <div className="flex flex-col gap-4 mt-10">
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg">First Name</h2>
          <p
            className={cn(
              "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-accent focus:outline-none text-gray-600 mt-2 focus:bg-accent/10"
            )}
          >
            {data.firstName}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg">Last Name</h2>
          <p
            className={cn(
              "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-accent focus:outline-none text-gray-600 mt-2 focus:bg-accent/10"
            )}
          >
            {data.lastName}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg"> Email</h2>
          <p
            className={cn(
              "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-accent focus:outline-none text-gray-600 mt-2 focus:bg-accent/10"
            )}
          >
            {data.email}
          </p>
        </div>
      </div>

      <UpdateProfileForm />
    </div>
  );
}

export default ProfilePage;
