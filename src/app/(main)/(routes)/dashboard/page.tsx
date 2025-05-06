import { DashboardBlocks } from "@/components/dashboard/dashboardBlocks";
import { InvoiceGraph } from "@/components/dashboard/invoiceGraph";
import { RecentInvoices } from "@/components/dashboard/recentInvoices";
import { auth } from "@/lib/auth";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    return (
        <div>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-8 mt-8">
                <InvoiceGraph />
                <RecentInvoices />
            </div>
        </div>
    )
}