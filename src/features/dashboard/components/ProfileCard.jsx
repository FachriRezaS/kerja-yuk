"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

export default function ProfileCard() {
    const [greeting, setGreeting] = useState("Good Morning");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);

    return (
        <Card className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-3xl shadow-xl shadow-red-500/20 border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
            
            <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-lg object-cover"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-white text-red-600 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                                <Camera size={14} />
                            </div>
                        </div>
                        <div>
                            <p className="text-red-100 font-medium mb-1 tracking-wide">{greeting},</p>
                            <h3 className="text-2xl font-black tracking-tight">John Doe</h3>
                            <p className="text-sm text-red-200 mt-1 font-medium bg-white/10 inline-block px-3 py-1 rounded-full border border-white/10">UI/UX Designer</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
