"use client"
import { Menu, Search, Bell, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header({ setIsSidebarOpen, title = "Dashboard Overview", user }) {
    const router = useRouter();
    const { logout } = useAuth();

    return (
        <header className="px-6 md:px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-10 sticky top-0 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button 
                    className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors" 
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-red-600 font-bold text-xl md:hidden">KerjaYuk!</h1>
                    <h2 className="hidden md:block text-2xl font-bold text-gray-800 dark:text-white tracking-tight">{title}</h2>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                {/* User Profile */}
                {user && (
                    <div className="hidden sm:flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 pl-2 pr-4 py-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user.name}</span>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase">{user.role}</span>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex items-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-700">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-48" />
                </div>
                <button 
                    className="relative text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 p-2.5 rounded-full" 
                    onClick={() => router.push("/notifications")}
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                </button>
                <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 p-2.5 rounded-full" 
                    onClick={() => router.push("/settings")}
                >
                    <Settings size={20} />
                </button>
                <button 
                    onClick={logout}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 p-2.5 rounded-full ml-1" 
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}
