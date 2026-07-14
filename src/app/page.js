import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileCard from "@/features/dashboard/components/ProfileCard";
import ActivityWidget from "@/features/dashboard/components/ActivityWidget";
import LeaveBalanceWidget from "@/features/leave/components/LeaveBalanceWidget";
import BirthdayWidget from "@/features/dashboard/components/BirthdayWidget";
import ManagerApprovalsWidget from "@/features/dashboard/components/ManagerApprovalsWidget";
import AttendanceChart from "@/features/attendance/components/AttendanceChart";
import CompanyCalendarWidget from "@/features/dashboard/components/CompanyCalendarWidget";
import NewsWidget from "@/features/dashboard/components/NewsWidget";
import OnlineUsersWidget from "@/features/dashboard/components/OnlineUsersWidget";

export default function Home() {
    return (
        <DashboardLayout title="Dashboard Overview">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 p-4 md:p-8">
                
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <ProfileCard />
                    <ActivityWidget />
                </div>

                {/* Manager Approvals (Conditionally rendered internally based on context) */}
                <ManagerApprovalsWidget />

                {/* Middle Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <LeaveBalanceWidget />
                    <BirthdayWidget />
                </div>

                {/* Phase 2 Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <AttendanceChart />
                    <CompanyCalendarWidget />
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <NewsWidget />
                    <OnlineUsersWidget />
                </div>

            </div>
        </DashboardLayout>
    );
}