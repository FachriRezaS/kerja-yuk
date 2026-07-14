"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { History, Search, Filter, Download, UserCheck, UserX, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

export default function AttendancePage() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";
    const [search, setSearch] = useState("");

    // Mock Data for Manager Monitoring
    const todayAttendance = [
        { id: 1, name: "Budi Santoso", status: "On Time", timeIn: "08:30 AM", location: "Menara Sahid, Sudirman" },
        { id: 2, name: "Andi Susanto", status: "Late", timeIn: "09:15 AM", location: "Menara Sahid, Sudirman" },
        { id: 3, name: "Citra Lestari", status: "Absent", timeIn: "--:--", location: "-" },
        { id: 4, name: "Dewi Ayu", status: "On Time", timeIn: "08:45 AM", location: "Remote (Bandung)" },
    ];

    // Mock Data for Staff History
    const myHistory = [
        { id: 101, date: "02 Jul 2026", status: "On Time", timeIn: "08:30 AM", timeOut: "17:05 PM", location: "Menara Sahid, Sudirman" },
        { id: 102, date: "01 Jul 2026", status: "On Time", timeIn: "08:25 AM", timeOut: "17:00 PM", location: "Menara Sahid, Sudirman" },
        { id: 103, date: "30 Jun 2026", status: "Late", timeIn: "09:10 AM", timeOut: "17:30 PM", location: "Menara Sahid, Sudirman" },
        { id: 104, date: "29 Jun 2026", status: "On Time", timeIn: "08:45 AM", timeOut: "17:15 PM", location: "Remote (Bandung)" },
        { id: 105, date: "28 Jun 2026", status: "Absent", timeIn: "--:--", timeOut: "--:--", location: "-" },
    ];

    const filteredManager = todayAttendance.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredStaff = myHistory.filter(p =>
        p.date.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout title={isManager ? "Attendance Monitoring" : "My Attendance History"}>
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                {isManager ? (
                    <>
                        {/* Manager View: Monitoring Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-green-100 font-bold uppercase tracking-wider text-xs mb-1">Present</p>
                                            <h3 className="text-3xl font-black">42</h3>
                                        </div>
                                        <div className="p-2 bg-white/20 rounded-lg"><UserCheck size={24} /></div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 text-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-yellow-100 font-bold uppercase tracking-wider text-xs mb-1">Late</p>
                                            <h3 className="text-3xl font-black">3</h3>
                                        </div>
                                        <div className="p-2 bg-white/20 rounded-lg"><Clock size={24} /></div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-red-500 to-red-600 border-0 text-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-red-100 font-bold uppercase tracking-wider text-xs mb-1">Absent</p>
                                            <h3 className="text-3xl font-black">2</h3>
                                        </div>
                                        <div className="p-2 bg-white/20 rounded-lg"><UserX size={24} /></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    Today's Log (2 Jul 2026)
                                </h3>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Search employee..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-bold">
                                        <Download size={16} />
                                        <span className="hidden sm:inline">Export</span>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Employee</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold">Time In</th>
                                            <th className="px-6 py-4 font-semibold">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredManager.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{log.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${log.status === 'On Time' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : log.status === 'Late' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-semibold">{log.timeIn}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                    {log.location !== "-" && <MapPin size={14} className="text-gray-400" />}
                                                    {log.location}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                ) : (
                    <>
                        {/* Staff View: History */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-blue-100 font-bold uppercase tracking-wider text-xs mb-1">Total Present</p>
                                            <h3 className="text-3xl font-black">18<span className="text-lg font-medium text-blue-200">/21 days</span></h3>
                                        </div>
                                        <div className="p-2 bg-white/20 rounded-lg"><UserCheck size={24} /></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    My Attendance History
                                </h3>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Search date..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Date</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold">Time In</th>
                                            <th className="px-6 py-4 font-semibold">Time Out</th>
                                            <th className="px-6 py-4 font-semibold">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredStaff.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{log.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${log.status === 'On Time' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : log.status === 'Late' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-semibold">{log.timeIn}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-semibold">{log.timeOut}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                    {log.location !== "-" && <MapPin size={14} className="text-gray-400" />}
                                                    {log.location}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )}
                
            </div>
        </DashboardLayout>
    );
}

