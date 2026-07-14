"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, FileText, CalendarCheck, Calendar, Clock, Download, MoreHorizontal, User } from "lucide-react";
import LeaveRequestModal from "@/features/leave/components/LeaveRequestModal";
import LeaveDetailModal from "@/features/leave/components/LeaveDetailModal";
import { useAuth } from "@/contexts/AuthContext";

export default function LeavePage() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";
    const isHRD = role === "hrd";
    
    const [search, setSearch] = useState("");
    const [monthFilter, setMonthFilter] = useState("07-2026"); // Default to July 2026
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("my-requests"); // For manager: 'my-requests' or 'approvals'

    // Mock Data for All Company (HRD) or Approvals (Manager)
    const allLeaves = [
        { id: "LV-001", employeeName: "Budi Santoso", type: "Annual Leave", date: "12 Jul - 14 Jul 2026", duration: "3 Days", status: "Approved", reason: "Family vacation to Bali" },
        { id: "LV-002", employeeName: "Andi Susanto", type: "Sick Leave", date: "02 Jul 2026", duration: "1 Day", status: "Pending", reason: "Fever and headache" },
        { id: "LV-003", employeeName: "Budi Santoso", type: "Annual Leave", date: "15 Jun 2026", duration: "1 Day", status: "Approved", reason: "Personal matters" },
        { id: "LV-004", employeeName: "Citra Lestari", type: "Maternity Leave", date: "10 Jul - 10 Oct 2026", duration: "3 Months", status: "Pending", reason: "Maternity" },
        { id: "LV-005", employeeName: "Eko Pratama", type: "Annual Leave", date: "05 Jul - 07 Jul 2026", duration: "3 Days", status: "Rejected", reason: "Taking care of sick child" },
    ];

    // Mock Data for individual (Staff / Manager personal)
    const myLeaves = [
        { id: "LV-001", employeeName: user?.name || "Budi Santoso", type: "Annual Leave", date: "12 Jul - 14 Jul 2026", duration: "3 Days", status: "Approved", reason: "Family vacation to Bali" },
        { id: "LV-003", employeeName: user?.name || "Budi Santoso", type: "Annual Leave", date: "15 Jun 2026", duration: "1 Day", status: "Approved", reason: "Personal matters" },
    ];

    // Determine which dataset to display
    let displayData = [];
    if (isHRD) {
        displayData = allLeaves;
    } else if (isManager) {
        displayData = activeTab === "approvals" ? allLeaves : myLeaves;
    } else {
        displayData = myLeaves;
    }

    // Filter by search and month (mocking the month filter logic by just checking if the string contains the month name)
    const monthNames = {
        "06-2026": "Jun",
        "07-2026": "Jul",
        "08-2026": "Aug"
    };
    
    const filtered = displayData.filter(c => {
        const matchesSearch = c.type.toLowerCase().includes(search.toLowerCase()) || 
                              c.id.toLowerCase().includes(search.toLowerCase()) ||
                              c.employeeName.toLowerCase().includes(search.toLowerCase());
                              
        const matchesMonth = monthFilter === "all" || c.date.includes(monthNames[monthFilter]);
        
        return matchesSearch && matchesMonth;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "Pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    return (
        <DashboardLayout title={isHRD ? "Company Time Off" : "Time Off Management"}>
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* Top Metrics Row */}
                {!isHRD && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-3xl shadow-xl shadow-red-500/20 border-0 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <CardContent className="p-6 relative z-10 flex justify-between items-center">
                                <div>
                                    <p className="text-red-100 font-bold uppercase tracking-wider text-xs mb-1">Annual Balance</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black">5</span>
                                        <span className="text-sm font-semibold text-red-200">Days Left</span>
                                    </div>
                                </div>
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                    <CalendarCheck size={28} className="text-white" />
                                </div>
                            </CardContent>
                        </Card>
                        
                        <div className="md:col-span-2 flex items-center bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Need a break?</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">Submit your time off request easily. Approval usually takes 1-2 business days depending on your manager.</p>
                            </div>
                            <button 
                                onClick={() => setIsRequestModalOpen(true)}
                                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-red-500/30 hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap"
                            >
                                <FileText size={18} />
                                Request Time Off
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <Card className="rounded-3xl border-0 shadow-sm overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    
                    {/* Header & Tabs */}
                    <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                        {isManager ? (
                            <div className="flex gap-2 p-2">
                                <button 
                                    onClick={() => setActiveTab("my-requests")}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${activeTab === "my-requests" ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                                >
                                    My Requests
                                </button>
                                <button 
                                    onClick={() => setActiveTab("approvals")}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === "approvals" ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                                >
                                    Pending Approvals
                                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">2</span>
                                </button>
                            </div>
                        ) : (
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    {isHRD ? "All Company Time Off" : "Time Off History"}
                                </h3>
                            </div>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50 dark:bg-gray-800/20">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder={isHRD || (isManager && activeTab === "approvals") ? "Search by employee, type, or ID..." : "Search leaves..."}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
                                />
                            </div>
                            
                            <select 
                                value={monthFilter}
                                onChange={(e) => setMonthFilter(e.target.value)}
                                className="p-2.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="all">All Months</option>
                                <option value="08-2026">August 2026</option>
                                <option value="07-2026">July 2026</option>
                                <option value="06-2026">June 2026</option>
                            </select>

                            <button className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900">
                                <Filter size={18} />
                            </button>
                        </div>
                        
                        {isHRD && (
                            <button className="flex items-center gap-2 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold bg-white dark:bg-gray-900">
                                <Download size={16} />
                                Export Report
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">ID</th>
                                    {(isHRD || (isManager && activeTab === "approvals")) && (
                                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Employee</th>
                                    )}
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Leave Type</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Date Range</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Duration</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filtered.length > 0 ? filtered.map((leave) => (
                                    <tr 
                                        key={leave.id} 
                                        onClick={() => setSelectedLeave(leave)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">{leave.id}</td>
                                        {(isHRD || (isManager && activeTab === "approvals")) && (
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                                                        <User size={14} />
                                                    </div>
                                                    {leave.employeeName}
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FileText size={16} className="text-gray-400" />
                                                <span className="font-semibold text-gray-900 dark:text-gray-200">{leave.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {leave.date}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-semibold">{leave.duration}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full border ${
                                                leave.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                                                leave.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 
                                                'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                                            }`}>
                                                {leave.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={isHRD || (isManager && activeTab === "approvals") ? 7 : 6} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <CalendarCheck size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                                                <p className="font-bold text-gray-900 dark:text-white text-lg">No records found</p>
                                                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {filtered.length > 0 && (
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
                            <span className="text-sm font-medium text-gray-500">Showing {filtered.length} entries</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Previous</button>
                                <button className="px-3 py-1.5 border border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-bold">1</button>
                                <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {selectedLeave && (
                <LeaveDetailModal 
                    leave={selectedLeave} 
                    onClose={() => setSelectedLeave(null)} 
                    isManager={isManager && activeTab === "approvals"}
                />
            )}

            {isRequestModalOpen && (
                <LeaveRequestModal onClose={() => setIsRequestModalOpen(false)} />
            )}
        </DashboardLayout>
    );
}
