import { X, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ClaimDetailModal({ claim, onClose }) {
    const { user } = useAuth();
    const role = user?.role || "employee";
    const isManager = role === "manager";

    if (!claim) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Claim Details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {claim.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                                {claim.employeeName.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">{claim.employeeName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Submitted on {claim.date}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(claim.status)}`}>
                            {claim.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Type</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{claim.type}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Amount</p>
                            <p className="font-black text-red-600 dark:text-red-400 text-lg">{claim.amount}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Description</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                            {claim.description}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Attachment</p>
                        <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                            <FileText size={24} className="text-blue-500" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">receipt_taxi.pdf</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">1.2 MB</p>
                            </div>
                            <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View</button>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                    {isManager && claim.status === 'Pending' ? (
                        <>
                            <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 rounded-lg transition-colors">
                                <XCircle size={16} /> Reject
                            </button>
                            <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                                <CheckCircle2 size={16} /> Approve
                            </button>
                        </>
                    ) : (
                        <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
