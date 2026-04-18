"use client";

import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminHeader() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/blogadmin/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-[#c9a84c]">Blog Admin</h1>
          <p className="text-sm text-gray-500">Manage your content</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}