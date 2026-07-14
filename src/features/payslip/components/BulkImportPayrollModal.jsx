import { X, Upload, FileSpreadsheet, Download } from "lucide-react";

export default function BulkImportPayrollModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <FileSpreadsheet size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bulk Import Payroll</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Template Download */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Download Template</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Use this CSV template for Payroll data.</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                            <Download size={14} /> payroll_template.csv
                        </button>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payroll Period</label>
                        <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500">
                            <option>July 2026</option>
                            <option>August 2026</option>
                            <option>September 2026</option>
                        </select>
                    </div>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                            <Upload size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Click to upload or drag and drop</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV or XLSX (Max. 5MB)</p>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        Upload & Review
                    </button>
                </div>
            </div>
        </div>
    );
}
