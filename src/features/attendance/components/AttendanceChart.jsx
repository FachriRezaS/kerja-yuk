"use client"
import { Card, CardContent } from "@/components/ui/card";

export default function AttendanceChart() {
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0">
            <CardContent className="p-8">
                <h3 className="font-bold text-gray-800 text-xl tracking-tight mb-6">Attendance Overview</h3>
                <div className="flex items-end gap-2 h-40">
                    {[
                        { day: 'Mon', h: '80%', color: 'bg-green-500' },
                        { day: 'Tue', h: '95%', color: 'bg-green-500' },
                        { day: 'Wed', h: '40%', color: 'bg-yellow-500' },
                        { day: 'Thu', h: '100%', color: 'bg-green-500' },
                        { day: 'Fri', h: '60%', color: 'bg-red-500' }
                    ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-gray-100 rounded-t-xl relative h-full flex items-end overflow-hidden group cursor-pointer">
                                <div className={`w-full rounded-t-xl transition-all duration-500 group-hover:opacity-80 ${bar.color}`} style={{ height: bar.h }}></div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">{bar.day}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-xs font-medium text-gray-600">On Time</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-xs font-medium text-gray-600">Late</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-xs font-medium text-gray-600">Absent</span></div>
                </div>
            </CardContent>
        </Card>
    );
}
