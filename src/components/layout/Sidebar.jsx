"use client"
import { Home, CalendarCheck, FileText, Users, Receipt, LogOut, Wallet, FileSpreadsheet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";
    const isHRD = role === "hrd";

    const navItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: CalendarCheck, label: "Attendance", path: "/attendance" },
        { icon: FileText, label: "Time Off", path: "/leave" },
        { icon: Users, label: "Employees", path: "/employees", show: isManager || isHRD },
        { icon: Receipt, label: "My Claims", path: "/claim", show: !isManager && !isHRD },
        { icon: Wallet, label: "My Payslips", path: "/payslip", show: !isManager && !isHRD },
        { icon: FileSpreadsheet, label: "Reimbursements", path: "/reimbursement", show: isManager },
        { icon: Wallet, label: "Payroll", path: "/payroll", show: isManager || isHRD },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-20 transition-colors duration-300">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <h1 className="text-gray-900 dark:text-white font-black text-2xl tracking-tight">Kerja<span className="text-red-600">Yuk!</span></h1>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
                    {navItems.map((item, index) => {
                        if (item.show === false) return null;
                        const isActive = pathname === item.path;
                        return (
                            <button 
                                key={index} 
                                onClick={() => router.push(item.path)}
                                className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 group
                                    ${isActive ? 'bg-red-50 dark:bg-red-900/20 text-red-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400'}`}
                            >
                                <item.icon size={22} className={`${isActive ? 'text-red-600' : 'text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400'}`} />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
                
                <div className="p-4 border-t border-gray-50 dark:border-gray-800">
                    <button onClick={logout} className="flex items-center gap-4 w-full px-4 py-3.5 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-xl transition-all duration-200 group">
                        <LogOut size={22} className="text-gray-400 dark:text-gray-500 group-hover:text-red-600" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar Slide-in */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden transform transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">K</span>
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">KerjaYuk!</h2>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item, index) => {
                        if (item.show === false) return null;
                        const isActive = pathname === item.path;
                        return (
                            <button 
                                key={index} 
                                onClick={() => { setIsSidebarOpen(false); router.push(item.path); }}
                                className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all
                                    ${isActive ? 'bg-red-50 dark:bg-red-900/20 text-red-600 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
