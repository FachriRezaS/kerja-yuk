"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Download } from "lucide-react";
import PayslipDetailModal from "@/features/payslip/components/PayslipDetailModal";
import { useAuth } from "@/contexts/AuthContext";

export default function PayslipPage() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";
    
    const [search, setSearch] = useState("");
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    // Mock Data
    const allPayslips = [
        { id: "PAY-2607-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "July 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 Jul 2026" },
        { id: "PAY-2607-002", employeeName: "Andi Susanto", role: "Frontend Developer", period: "July 2026", netPay: "Rp 11.200.000", status: "Paid", paidAt: "25 Jul 2026" },
        { id: "PAY-2607-003", employeeName: "Citra Lestari", role: "Product Manager", period: "July 2026", netPay: "Rp 15.000.000", status: "Draft", paidAt: "-" },
        { id: "PAY-2606-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "June 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 Jun 2026" },
        { id: "PAY-2605-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "May 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 May 2026" },
    ];

    // Staff only sees their own history
    const displayPayslips = allPayslips.filter(p => p.employeeName === "Budi Santoso");

    const filtered = displayPayslips.filter(p => 
        p.employeeName.toLowerCase().includes(search.toLowerCase()) || 
        p.period.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout title="My Payslip">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white shadow-lg shadow-blue-500/20 md:col-span-2">
                        <CardContent className="p-6">
                            <p className="text-blue-100 font-bold uppercase tracking-wider text-xs mb-2">Latest Take Home Pay (June 2026)</p>
                            <h3 className="text-3xl font-black">Rp 12.500.000</h3>
                            <p className="text-sm text-blue-200 mt-2 font-medium">Paid on 25 Jun 2026</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            My Payslip History
                        </h3>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search period..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <select className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block">
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Period</th>
                                    <th className="px-6 py-4 font-semibold">Net Pay</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Paid Date</th>
                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filtered.map((payslip) => (
                                    <tr key={payslip.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => setSelectedPayslip(payslip)}>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{payslip.period}</td>
                                        <td className="px-6 py-4 font-black text-gray-900 dark:text-white">{payslip.netPay}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${payslip.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                {payslip.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{payslip.paidAt}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedPayslip(payslip); }}>
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Modals */}
                {selectedPayslip && <PayslipDetailModal payslip={selectedPayslip} onClose={() => setSelectedPayslip(null)} />}
                
            </div>
        </DashboardLayout>
    );
}
