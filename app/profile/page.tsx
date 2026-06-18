import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserRepository } from "@/lib/repositories/user.repository";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, ShieldCheck, Calendar, Camera } from "lucide-react";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/profile");
  }

  const sessionUser = session.user as { id?: string; email?: string };
  
  let userData = null;
  if (sessionUser.id) {
    userData = await UserRepository.findById(sessionUser.id);
  } else if (sessionUser.email) {
    userData = await UserRepository.findByEmail(sessionUser.email);
  }

  if (!userData) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">User not found</h1>
        <p className="mt-2 text-zinc-500">We could not retrieve your profile information.</p>
      </div>
    );
  }

  const joinDate = userData.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">Account settings</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-950">
            Profile
          </h1>
          <p className="mt-2 text-zinc-600">
            View and manage your personal information and preferences.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Left Column: Avatar & Basic Info */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center pt-8">
            <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-lg">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt={userData.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-4xl font-bold text-zinc-400">
                  {userData.name?.substring(0, 2).toUpperCase() || 'U'}
                </div>
              )}
              {/* Overlay for Future Update Image Feature */}
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-zinc-950">{userData.name}</h2>
            <p className="text-sm text-zinc-500">{userData.email}</p>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="capitalize">
                {userData.role || 'User'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Detailed Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center text-sm font-medium text-zinc-500">
                  <User className="mr-2 h-4 w-4" />
                  Full Name
                </div>
                <p className="text-base font-semibold text-zinc-900">{userData.name}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-sm font-medium text-zinc-500">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Address
                </div>
                <p className="text-base font-semibold text-zinc-900">{userData.email}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm font-medium text-zinc-500">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Account Role
                </div>
                <p className="text-base font-semibold capitalize text-zinc-900">
                  {userData.role || 'User'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm font-medium text-zinc-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Joined
                </div>
                <p className="text-base font-semibold text-zinc-900">{joinDate}</p>
              </div>
            </div>

            {/* Future Placeholder for Actions */}
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <p className="text-sm text-zinc-500 mb-4">
                Updating profile information will be available soon.
              </p>
              <div className="flex gap-3">
                <button disabled className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-400">
                  Edit Profile
                </button>
                <button disabled className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-400">
                  Change Password
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
