"use client"
import { CalendarCheck, Receipt, Clock, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ManagerApprovalsWidget() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    if (role !== "manager") return null;

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-xl mb-6">Pending Approvals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Leave Requests", count: 4, icon: CalendarCheck, color: "text-blue-400" },
                    { title: "Reimbursements", count: 12, icon: Receipt, color: "text-green-400" },
                    { title: "Overtime", count: 2, icon: Clock, color: "text-purple-400" },
                    { title: "Timesheets", count: 8, icon: FileText, color: "text-orange-400" },
                ].map((item, i) => (
                    <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <item.icon size={20} className={item.color} />
                            </div>
                            <span className="text-2xl font-black">{item.count}</span>
                        </div>
                        <p className="font-semibold text-sm text-gray-300">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
