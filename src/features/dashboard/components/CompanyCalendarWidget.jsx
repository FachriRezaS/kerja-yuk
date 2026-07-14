"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function CompanyCalendarWidget() {
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0">
            <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 text-xl tracking-tight">Upcoming Events</h3>
                    <Calendar size={20} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                    {[
                        { title: "Q3 Townhall Meeting", date: "15 Aug 2026", time: "14:00 - 16:00", type: "Event", color: "bg-blue-100 text-blue-600" },
                        { title: "Independence Day", date: "17 Aug 2026", time: "All Day", type: "Holiday", color: "bg-red-100 text-red-600" }
                    ].map((event, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex flex-col items-center justify-center bg-white w-14 h-14 rounded-xl shadow-sm shrink-0">
                                <span className="text-xs font-bold text-red-600 uppercase">{event.date.split(' ')[1]}</span>
                                <span className="text-xl font-black text-gray-900 leading-none">{event.date.split(' ')[0]}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{event.title}</h4>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
                                    <Clock size={14} /> {event.time}
                                </p>
                            </div>
                            <div className="ml-auto hidden sm:flex items-start">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${event.color}`}>
                                    {event.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
