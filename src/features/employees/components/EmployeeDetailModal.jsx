import { X, Mail, Phone, MapPin, Briefcase, Calendar, ShieldAlert } from "lucide-react";

export default function EmployeeDetailModal({ employee, onClose }) {
    if (!employee) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-2xl">
                            {employee.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{employee.role}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 uppercase">Employee ID</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{employee.id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                            <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                                {employee.status}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">Contact Information</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <Mail size={16} className="text-gray-400" />
                            <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <Phone size={16} className="text-gray-400" />
                            <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <MapPin size={16} className="text-gray-400" />
                            <span>Jakarta, Indonesia</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">Employment Details</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <Briefcase size={16} className="text-gray-400" />
                            <span>Department: {employee.dept}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <Calendar size={16} className="text-gray-400" />
                            <span>Joined: Jan 15, 2024</span>
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                    {employee.status === 'Active' ? (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                            <ShieldAlert size={16} /> Deactivate
                        </button>
                    ) : (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors">
                            Activate
                        </button>
                    )}
                    
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
