"use client";

import dynamic from "next/dynamic";

const ClientToastContainer = dynamic(
  () => import("@/components/common/ClientToastContainer"),
  { ssr: false }
);

export default function ClientOnlyWrapper() {
  return <ClientToastContainer />;
}