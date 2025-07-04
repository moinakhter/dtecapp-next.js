"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/common/SectionWrapper";
import { useRouter } from "@/i18n/navigation";

interface UserData {
  username: string;
  email: string;
  company: string;
  storeUrl: string;
  token: string;
  tokenExpiry: string;
  expired: boolean;
}

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

      const response = await fetch('/api/user', { credentials: 'include' });


        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to fetch user data");
        }

        const result = await response.json();
        setUserData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
 

 

const handleLogout = async () => {
  await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include'
  });

  router.push('/products/shopify-assistant/signin');
};

  if (loading) return <SectionWrapper className="text-center py-[128px]">Loading...</SectionWrapper>;
  if (error) return <SectionWrapper className="text-center  py-[128px] mt-10 text-red-500">{error}</SectionWrapper>;

  return (
    <SectionWrapper className="max-w-xl mt-[120px]">
      <h1 className="text-3xl font-bold">Store Details</h1>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span>View Store Customers:</span>
          <a href="#" className="text-blue-400">Click Here</a>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Username:</span>
          <span>{userData?.username}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Email:</span>
          <span>{userData?.email}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Company:</span>
          <span>{userData?.company}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Shopify Store:</span>
          <a href={userData?.storeUrl} target="_blank" className="text-blue-400">{userData?.storeUrl}</a>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
   <span>DTEC Access Token:</span>

          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={userData?.token}
              className="  w-64 p-1 rounded mr-2"
            />
            <Button onClick={() => navigator.clipboard.writeText(userData?.token || "")}>
              Copy
            </Button>
          </div>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Expired?</span>
          <span className={userData?.expired ? "text-red-500" : "text-green-500"}>
            {userData?.expired ? "Yes" : "No"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Token Expiry:</span>
          <span>{userData?.tokenExpiry}</span>
        </div>

        <Button  onClick={handleLogout} className="mt-4">Logout</Button>
      </div>
    </SectionWrapper>
  );
};

export default DashboardPage;
