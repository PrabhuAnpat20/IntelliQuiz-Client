"use client"; // Add this at the top for client-side execution

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in App Router

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
