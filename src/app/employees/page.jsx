"use client"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Upload, MoreHorizontal, Filter, Download } from "lucide-react";
import EmployeeDetailModal from "@/features/employees/components/EmployeeDetailModal";
import AddEmployeeModal from "@/features/employees/components/AddEmployeeModal";
import BulkImportModal from "@/features/employees/components/BulkImportModal";

export default function EmployeesPage() {
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);

    // Mock Data
    const employees = [
        { id: "EMP-001", name: "Andi Susanto", role: "Frontend Developer", dept: "Engineering", email: "andi@kerjayuk.com", phone: "+62 812-3456-7890", status: "Active" },
        { id: "EMP-002", name: "Budi Santoso", role: "Backend Developer", dept: "Engineering", email: "budi@kerjayuk.com", phone: "+62 812-3456-7891", status: "Active" },
        { id: "EMP-003", name: "Citra Lestari", role: "Product Manager", dept: "Product", email: "citra@kerjayuk.com", phone: "+62 812-3456-7892", status: "Inactive" },
        { id: "EMP-004", name: "Dina Marlina", role: "HR Specialist", dept: "Human Resources", email: "dina@kerjayuk.com", phone: "+62 812-3456-7893", status: "Active" },
        { id: "EMP-005", name: "Eko Pratama", role: "UI/UX Designer", dept: "Design", email: "eko@kerjayuk.com", phone: "+62 812-3456-7894", status: "Active" },
    ];

    const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));

    return (
        <DashboardLayout title="Employees">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search employees..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => setIsImportOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                        >
                            <Upload size={18} /> Bulk Import
                        </button>
                        <button 
                            onClick={() => setIsAddOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        >
                            <Plus size={18} /> Add Employee
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Employee</th>
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Department</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filtered.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group" onClick={() => setSelectedEmployee(emp)}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{emp.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{emp.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{emp.id}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{emp.dept}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${emp.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }}>
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Mock */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <p>Showing 1 to {filtered.length} of {employees.length} entries</p>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Prev</button>
                            <button className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-900/50 rounded">1</button>
                            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </Card>

                {/* Modals */}
                {selectedEmployee && <EmployeeDetailModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
                {isAddOpen && <AddEmployeeModal onClose={() => setIsAddOpen(false)} />}
                {isImportOpen && <BulkImportModal onClose={() => setIsImportOpen(false)} />}
                
            </div>
        </DashboardLayout>
    );
}
