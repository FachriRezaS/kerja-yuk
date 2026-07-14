"use client"
import { Home, CalendarCheck, FileText, Settings, LogOut, Wallet, FileSpreadsheet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";

    const isActive = (path) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none border-t border-gray-100 dark:border-gray-800 z-20 pb-safe transition-colors duration-300">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 relative">
                {/* Left items */}
                <button 
                    onClick={() => router.push("/")} 
                    className={`flex flex-col items-center p-2 transition-colors ${isActive("/") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                >
                    <Home size={24} className="mb-1" />
                    <span className="text-[10px] font-bold text-center">Home</span>
                </button>
                <button 
                    onClick={() => router.push("/attendance")} 
                    className={`flex flex-col items-center p-2 transition-colors mr-6 ${isActive("/attendance") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                >
                    <CalendarCheck size={24} className="mb-1" />
                    <span className="text-[10px] font-bold text-center">Attendance</span>
                </button>

                {/* Middle FAB */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                    <button onClick={logout} className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-lg shadow-red-500/40 dark:shadow-red-900/40 border-4 border-white dark:border-gray-900 transform hover:scale-105 transition-all">
                        <LogOut size={24} className="ml-1" />
                    </button>
                </div>

                {/* Right items */}
                {isManager ? (
                    <>
                        <button 
                            onClick={() => router.push("/payroll")} 
                            className={`flex flex-col items-center p-2 transition-colors ml-6 ${isActive("/payroll") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <FileSpreadsheet size={24} className="mb-1" />
                            <span className="text-[10px] font-bold text-center">Payroll</span>
                        </button>
                        <button 
                            onClick={() => router.push("/reimbursement")} 
                            className={`flex flex-col items-center p-2 transition-colors ${isActive("/reimbursement") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <Wallet size={24} className="mb-1" />
                            <span className="text-[10px] font-bold text-center">Claims</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => router.push("/leave")} 
                            className={`flex flex-col items-center p-2 transition-colors ml-6 ${isActive("/leave") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <FileText size={24} className="mb-1" />
                            <span className="text-[10px] font-bold text-center">Leave</span>
                        </button>
                        <button 
                            onClick={() => router.push("/payslip")} 
                            className={`flex flex-col items-center p-2 transition-colors ${isActive("/payslip") ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <Settings size={24} className="mb-1" />
                            <span className="text-[10px] font-bold text-center">Payslip</span>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
