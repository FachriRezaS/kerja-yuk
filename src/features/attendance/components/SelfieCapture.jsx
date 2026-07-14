"use client"
import { Camera, Clock, CheckCircle2 } from "lucide-react";

export default function SelfieCapture({ status, handleCheckIn }) {
    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center">
            {status === "success" ? (
                <div className="flex flex-col items-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Check In Successful!</h2>
                    <p className="text-gray-500 mt-2 font-medium">You are clocked in at 08:30 AM</p>
                </div>
            ) : (
                <>
                    <div className="w-48 h-48 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 mb-6 relative overflow-hidden group cursor-pointer hover:border-red-400 transition-colors">
                        <Camera size={40} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm font-bold text-gray-700">Tap to Capture</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleCheckIn}
                        disabled={status === "checking_in"}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
                    >
                        {status === "checking_in" ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Clock size={22} />
                                Swipe to Check In
                            </>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
