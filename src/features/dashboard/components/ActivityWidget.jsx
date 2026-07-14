"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import ClockInModal from "@/features/attendance/components/ClockInModal";

export default function ActivityWidget() {
    const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);
    const [clockInTime, setClockInTime] = useState("08:30");
    const [clockOutTime, setClockOutTime] = useState("--:--");
    
    // Derived state for mock
    const isClockedIn = clockInTime !== "--:--" && clockOutTime === "--:--";

    const handleClockInSuccess = () => {
        // Just mock updating the time for now
        if (!isClockedIn && clockInTime === "--:--") {
            setClockInTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
        } else if (isClockedIn) {
            setClockOutTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
        }
    };
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0">
            <CardContent className="p-8 flex flex-col h-full">
                <h3 className="font-bold text-gray-800 text-xl tracking-tight mb-8">
                    Today's Activity
                </h3>
                
                <div className="flex-1 flex justify-between items-center gap-4 relative">
                    {/* Check In */}
                    <button 
                        onClick={() => { if (clockInTime === "--:--") setIsClockInModalOpen(true); }}
                        className={`flex flex-col items-center flex-1 transition-all ${clockInTime === "--:--" ? "cursor-pointer hover:scale-105 group" : "opacity-80"}`}
                    >
                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 shadow-inner transition-colors ${clockInTime !== "--:--" ? "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-900/30" : "bg-red-100 border-red-200 dark:bg-red-900/40 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-red-500/30"}`}>
                            <Clock size={28} className={clockInTime !== "--:--" ? "text-red-600 dark:text-red-400" : "text-red-600 dark:text-red-400 group-hover:text-white"} />
                        </div>
                        <p className="text-xl font-black text-gray-900 dark:text-white">{clockInTime}</p>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Clock In</p>
                    </button>
                    
                    {/* Timeline / Progress */}
                    <div className="flex flex-col items-center flex-[1.5] w-full px-2">
                        <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-2">
                            <span>8h</span>
                            <span>17:00</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-[40%] relative">
                                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                            </div>
                        </div>
                        <span className="text-red-600 font-black text-lg mt-3">03:00:00</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Working Hours</span>
                    </div>
                    
                    {/* Check Out */}
                    <button 
                        onClick={() => { if (isClockedIn) setIsClockInModalOpen(true); }}
                        className={`flex flex-col items-center flex-1 transition-all ${isClockedIn ? "cursor-pointer hover:scale-105 group" : "opacity-50"}`}
                        disabled={!isClockedIn}
                    >
                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 transition-all ${clockOutTime !== "--:--" ? "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30" : isClockedIn ? "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-blue-500/30" : "bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-700"}`}>
                            <Clock size={28} className={clockOutTime !== "--:--" ? "text-blue-600 dark:text-blue-400" : isClockedIn ? "text-gray-600 dark:text-gray-300 group-hover:text-white" : "text-gray-300 dark:text-gray-600"} />
                        </div>
                        <p className="text-xl font-black text-gray-900 dark:text-white">{clockOutTime}</p>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Clock Out</p>
                    </button>
                </div>
                
                {isClockInModalOpen && (
                    <ClockInModal 
                        onClose={() => setIsClockInModalOpen(false)} 
                        onClockInSuccess={handleClockInSuccess} 
                    />
                )}
            </CardContent>
        </Card>
    );
}
