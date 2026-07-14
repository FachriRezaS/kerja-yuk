"use client"
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function DashboardLayout({ children, title = "Dashboard Overview" }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#F8FAFC] dark:bg-gray-950">
                <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden font-sans">
                
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                    
                    <Header 
                        setIsSidebarOpen={setIsSidebarOpen} 
                        title={title} 
                        user={user}
                    />

                    {/* Main Scrollable Content */}
                    <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
                        {children}
                    </main>

                    <BottomNav />
                </div>
        </div>
    );
}
