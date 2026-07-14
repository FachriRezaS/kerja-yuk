"use client"
import { useState } from "react";
import { X, Calendar, FileText } from "lucide-react";

export default function LeaveRequestModal({ onClose }) {
    const [status, setStatus] = useState("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            setTimeout(onClose, 1500);
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in-95 shadow-2xl border border-gray-100 dark:border-gray-800">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar size={40} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Request Submitted!</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Your time off request has been sent for approval.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl relative my-8 animate-in fade-in zoom-in-95 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText size={20} className="text-red-500" />
                        Request Time Off
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Leave Type</label>
                        <select required className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white font-medium">
                            <option value="">Select leave type...</option>
                            <option value="annual">Annual Leave</option>
                            <option value="sick">Sick Leave</option>
                            <option value="unpaid">Unpaid Leave</option>
                            <option value="maternity">Maternity Leave</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                            <input type="date" required className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                            <input type="date" required className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white font-medium" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Reason</label>
                        <textarea 
                            required 
                            rows="3" 
                            placeholder="Please provide a reason for your time off..."
                            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white font-medium resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={status === "submitting"}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:scale-[1.02] transition-transform disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {status === "submitting" ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
