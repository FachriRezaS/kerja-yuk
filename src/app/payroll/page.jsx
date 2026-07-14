"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Download, Upload, Send, RefreshCw, Receipt } from "lucide-react";
import PayslipDetailModal from "@/features/payslip/components/PayslipDetailModal";
import BulkImportPayrollModal from "@/features/payslip/components/BulkImportPayrollModal";
import { useAuth } from "@/contexts/AuthContext";

export default function PayrollPage() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";
    
    const [search, setSearch] = useState("");
    const [selectedPayslip, setSelectedPayslip] = useState(null);
    const [isImportOpen, setIsImportOpen] = useState(false);

    // Mock Data
    const allPayslips = [
        { id: "PAY-2607-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "July 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 Jul 2026" },
        { id: "PAY-2607-002", employeeName: "Andi Susanto", role: "Frontend Developer", period: "July 2026", netPay: "Rp 11.200.000", status: "Paid", paidAt: "25 Jul 2026" },
        { id: "PAY-2607-003", employeeName: "Citra Lestari", role: "Product Manager", period: "July 2026", netPay: "Rp 15.000.000", status: "Draft", paidAt: "-" },
        { id: "PAY-2606-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "June 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 Jun 2026" },
        { id: "PAY-2605-001", employeeName: "Budi Santoso", role: "Backend Developer", period: "May 2026", netPay: "Rp 12.500.000", status: "Paid", paidAt: "25 May 2026" },
    ];

    const displayPayslips = allPayslips;

    const filtered = displayPayslips.filter(p => 
        p.employeeName.toLowerCase().includes(search.toLowerCase()) || 
        p.period.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout title="Payroll Management">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                {!isManager ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                            <Receipt size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">You do not have permission to view the Payroll Management dashboard.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white shadow-lg shadow-blue-500/20 col-span-1 sm:col-span-2">
                                <CardContent className="p-6">
                                    <p className="text-blue-100 font-bold uppercase tracking-wider text-xs mb-2">Estimated Payroll (Jul 2026)</p>
                                    <h3 className="text-3xl font-black">Rp 245.5M</h3>
                                    <p className="text-sm text-blue-200 mt-2 font-medium">For 45 active employees</p>
                                </CardContent>
                            </Card>
                            <div 
                                role="button"
                                tabIndex={0}
                                onClick={() => setIsImportOpen(true)}
                                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full text-blue-600 dark:text-blue-400">
                                    <Upload size={24} />
                                </div>
                                <span className="font-bold text-gray-900 dark:text-gray-100">Bulk Import</span>
                            </div>
                            <div role="button" tabIndex={0} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400">
                                    <Send size={24} />
                                </div>
                                <span className="font-bold text-gray-900 dark:text-gray-100">Send Payroll</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <RefreshCw size={20} className="text-blue-600 dark:text-blue-400" />
                                <div>
                                    <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Automated Payroll is ON</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">Salaries will be automatically sent on the 25th of every month.</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                                Configure
                            </button>
                        </div>

                        <Card>
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    Payroll Records
                                </h3>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Search employees..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <select className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block">
                                        <option>2026</option>
                                        <option>2025</option>
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
                                            <th className="px-6 py-4 font-semibold">Employee</th>
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
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-gray-900 dark:text-white">{payslip.employeeName}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{payslip.role}</p>
                                                </td>
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
                                                        {payslip.status === 'Draft' && (
                                                            <button className="px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                                                Send
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )}

                {selectedPayslip && <PayslipDetailModal payslip={selectedPayslip} onClose={() => setSelectedPayslip(null)} />}
                {isImportOpen && <BulkImportPayrollModal onClose={() => setIsImportOpen(false)} />}
                
            </div>
        </DashboardLayout>
    );
}
