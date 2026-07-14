"use client"
import { useState } from "react";
import { X, Calendar, User, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function LeaveDetailModal({ leave, onClose, isManager }) {
    const [actionStatus, setActionStatus] = useState("idle"); // idle, approving, rejecting, done

    if (!leave) return null;

    const handleAction = (action) => {
        setActionStatus(action === 'approve' ? 'approving' : 'rejecting');
        setTimeout(() => {
            setActionStatus('done');
            setTimeout(onClose, 1000);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl relative my-8 animate-in fade-in zoom-in-95 border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Leave Request Detail</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Request ID</p>
                            <p className="font-bold text-gray-900 dark:text-white">{leave.id}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border ${
                            leave.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                            leave.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 
                            'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                        }`}>
                            {leave.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                                <User size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Employee</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{leave.employeeName}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                                <FileText size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Leave Type</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{leave.type}</p>
                        </div>
                        <div className="col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                                <Calendar size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Duration</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{leave.date}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Reason</p>
                        <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium">
                            {leave.reason}
                        </div>
                    </div>

                    {isManager && leave.status === "Pending" && (
                        <div className="pt-4 flex gap-3 border-t border-gray-100 dark:border-gray-800">
                            <button 
                                onClick={() => handleAction('reject')}
                                disabled={actionStatus !== "idle"}
                                className="flex-1 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {actionStatus === "rejecting" ? (
                                    <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <><XCircle size={20} /> Reject</>
                                )}
                            </button>
                            <button 
                                onClick={() => handleAction('approve')}
                                disabled={actionStatus !== "idle"}
                                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {actionStatus === "approving" ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <><CheckCircle2 size={20} /> Approve</>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
