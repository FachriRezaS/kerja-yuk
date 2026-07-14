import { X, Download, Printer, CreditCard } from "lucide-react";

export default function PayslipDetailModal({ payslip, onClose }) {
    if (!payslip) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payslip Details</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{payslip.period}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Printer size={18} />
                        </button>
                        <button className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                            <Download size={18} />
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors ml-2">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* Employee Info */}
                    <div className="flex flex-col md:flex-row justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Employee</p>
                            <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{payslip.employeeName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{payslip.id}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Status</p>
                            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                {payslip.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Earnings */}
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Earnings</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Basic Salary</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{payslip.netPay}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Transport Allowance</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Rp 500.000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Meal Allowance</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Rp 1.000.000</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Deductions</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Tax (PPh 21)</span>
                                    <span className="font-medium text-red-600 dark:text-red-400">-Rp 350.000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">BPJS Kesehatan</span>
                                    <span className="font-medium text-red-600 dark:text-red-400">-Rp 150.000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">BPJS Ketenagakerjaan</span>
                                    <span className="font-medium text-red-600 dark:text-red-400">-Rp 250.000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Take Home Pay</span>
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{payslip.netPay}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
