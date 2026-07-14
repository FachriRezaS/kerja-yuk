"use client"
import { useState } from "react";
import { X } from "lucide-react";
import GeofencingMap from "./GeofencingMap";
import SelfieCapture from "./SelfieCapture";

export default function ClockInModal({ onClose, onClockInSuccess }) {
    const [status, setStatus] = useState("ready"); // ready, checking_in, success

    const handleCheckIn = () => {
        setStatus("checking_in");
        setTimeout(() => {
            setStatus("success");
            // Call onClockInSuccess after a small delay so they can see the success state
            setTimeout(() => {
                if (onClockInSuccess) onClockInSuccess();
                onClose();
            }, 1500);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div 
                className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Attendance</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <GeofencingMap />
                    <SelfieCapture status={status} handleCheckIn={handleCheckIn} />
                </div>
            </div>
        </div>
    );
}
