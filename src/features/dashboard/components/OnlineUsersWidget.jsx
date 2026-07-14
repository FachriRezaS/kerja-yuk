"use client"
import { Card, CardContent } from "@/components/ui/card";

export default function OnlineUsersWidget() {
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0">
            <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 text-xl tracking-tight">Online Users</h3>
                    <span className="bg-green-50 border border-green-100 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        15 Online
                    </span>
                </div>
                
                <div className="grid grid-cols-3 gap-y-6 gap-x-2 mt-6">
                    {["/profile.jpg", "/profile.jpg", "/profile.jpg", "/profile.jpg", "/profile.jpg"].map((src, index) => (
                        <div key={index} className="flex flex-col items-center group cursor-pointer">
                            <div className="relative">
                                <img
                                    src={src}
                                    alt={`User ${index + 1}`}
                                    className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <p className="text-xs mt-3 font-semibold text-gray-600 group-hover:text-gray-900 truncate w-16 text-center transition-colors">User {index + 1}</p>
                        </div>
                    ))}
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-sm font-bold text-gray-500 border-2 border-dashed border-gray-200 group-hover:border-red-400 group-hover:text-red-600 group-hover:bg-red-50 transition-all duration-300">
                            +10
                        </div>
                        <p className="text-xs mt-3 font-semibold text-gray-500 group-hover:text-red-600 transition-colors">More</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
