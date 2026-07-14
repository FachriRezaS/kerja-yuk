"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, Receipt, MoreHorizontal } from "lucide-react";
import NewClaimModal from "@/features/reimbursement/components/NewClaimModal";
import ClaimDetailModal from "@/features/reimbursement/components/ClaimDetailModal";
import { useAuth } from "@/contexts/AuthContext";

export default function ClaimPage() {
    const { user } = useAuth();
    const role = user?.role || "employee";
    
    const [search, setSearch] = useState("");
    const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);

    // Mock Data for individual user (Staff)
    const myClaims = [
        { id: "CLM-001", employeeName: "Budi Santoso", type: "Travel & Transport", date: "28 Jun 2026", amount: "Rp 120.000", status: "Approved", description: "Taxi for client meeting at SCBD" },
        { id: "CLM-003", employeeName: "Budi Santoso", type: "Office Supplies", date: "15 Jun 2026", amount: "Rp 500.000", status: "Approved", description: "New keyboard and mouse" },
    ];

    const filtered = myClaims.filter(c => 
        c.type.toLowerCase().includes(search.toLowerCase()) || 
        c.id.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        }
    };

    return (
        <DashboardLayout title="My Claims">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">My Approved Claims (YTD)</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Rp 620.000</h3>
                        </CardContent>
                    </Card>
                    <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsNewClaimOpen(true)}
                        className="bg-gradient-to-br from-red-600 to-red-700 text-white border-0 shadow-md shadow-red-500/20 rounded-xl p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform text-left cursor-pointer"
                    >
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Plus size={24} className="text-white" />
                        </div>
                        <div>
                            <span className="block font-bold text-lg">New Claim</span>
                            <span className="text-sm text-red-100">Submit a new claim</span>
                        </div>
                    </div>
                </div>

                <Card>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            My Claims History
                        </h3>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search claims..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500"
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
                                    <th className="px-6 py-4 font-semibold">Claim ID</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filtered.map((claim) => (
                                    <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => setSelectedClaim(claim)}>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{claim.id}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Receipt size={16} className="text-gray-400" />
                                                {claim.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{claim.date}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{claim.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" onClick={(e) => { e.stopPropagation(); setSelectedClaim(claim); }}>
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Modals */}
                {isNewClaimOpen && <NewClaimModal onClose={() => setIsNewClaimOpen(false)} />}
                {selectedClaim && <ClaimDetailModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />}
                
            </div>
        </DashboardLayout>
    );
}
