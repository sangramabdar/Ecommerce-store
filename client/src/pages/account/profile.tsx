import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../components/ui/skeleton";
import { Navigate } from "react-router-dom";
import { getProfileService } from "../../services/profile.service";
import UpdateProfileForm from "../../components/account/update-profile-form";

function ProfilePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
  });

  if (isLoading) return <Skeleton className="h-52" />;

  if (error) return <Navigate to={"/not-found"} />;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg">First Name</h2>
          <p className="text-gray-600">{data.firstName}</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg">Last Name</h2>
          <p className="text-gray-600">{data.lastName}</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-gray-900 font-medium md:text-lg"> Email</h2>
          <p className="text-gray-600">{data.email}</p>
        </div>
      </div>

      <UpdateProfileForm />
    </div>
  );
}

export default ProfilePage;
