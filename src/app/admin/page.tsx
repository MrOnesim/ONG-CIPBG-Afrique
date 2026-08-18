import { verifyAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const admin = await verifyAdmin();
  if (!admin) redirect("/admin/login");

  return <AdminDashboard admin={admin} />;
}
