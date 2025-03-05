"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Home, CalendarCheck, LogOut, FileText, Bell, Settings, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();
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
        <div className="flex flex-col min-h-screen bg-gray-100">
             {/* Header */}
            <header className="p-4 bg-white shadow flex justify-between items-center">
                <h1 className="text-red-600 font-bold text-xl">KerjaYuk!</h1>
                <button className="text-gray-600" onClick={() => router.push("/notifications") }>
                <Bell size={20} />
                </button>
            </header>

            <div className="p-4 text-lg font-semibold">Hi, {greeting}!</div>

            {/* Profile Card */}
            <Card className="bg-red-500 text-white p-4 rounded-xl flex justify-between">
                <CardContent className="flex items-center gap-4">
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-white"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">Tabay</h2>
                        <p className="text-sm">UI/UX Designer</p>
                    </div>
                </CardContent>
                <CardContent className="flex items-center gap-4">
                <div className="text-left">
                    <p className="text-sm">Member since 01 Juni 2021</p>
                    <p className="text-xs">Location: Kantor Sahid</p>
                </div>
                </CardContent>
            </Card>

            {/* Activity */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold flex items-center gap-2">
                Today's Activity
                </h3>
                <div className="flex justify-between items-center mt-2 md:flex-row md:gap-4 gap-2">
                    <div className="flex flex-col items-center">
                        <Clock size={20} className="text-red-500 mb-1" /> 
                        <p className="text-sm font-semibold">Check In</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Clock size={20} className="text-red-500 mb-1" /> 
                        <span className="text-red-500">03:00:00 Working Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Clock size={20} className="text-red-500 mb-1" /> 
                        <span>Check Out</span>
                    </div>
                </div>
            </div>

            {/* PCS News */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">PCS News</h3>
                <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-4">
                    <img
                    src="/profile.jpg"
                    alt="Ana Riswati"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                    <p className="text-sm font-semibold">Ana Riswati</p>
                </div>
                <p className="text-sm text-gray-500">Senin 30 Mei 2022</p>
                </div>
                <ul className="list-disc ml-4 text-sm mt-2">
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
            </div>

            {/* Online Section */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">Online</h3>
                <div className="flex items-center gap-2 mt-2 overflow-x-auto">
                {["/profile.jpg", "/profile.jpg", "/profile.jpg", "/profile.jpg", "/profile.jpg"].map((src, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <img
                        src={src}
                        alt={`User ${index + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                    <p className="text-xs mt-1">User {index + 1}</p>
                    </div>
                ))}
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                    +10
                    </div>
                    <p className="text-xs mt-1">More</p>
                </div>
                </div>
            </div>
        

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white shadow-md p-2 flex justify-around">
            <button className="flex flex-col items-center text-red-500">
                <Home size={20} />
                <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <CalendarCheck size={20} />
                <span className="text-xs">Attendance</span>
            </button>
            <button className="flex flex-col items-center text-white bg-red-500 p-3 rounded-full">
                <LogOut size={24} />
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <FileText size={20} />
                <span className="text-xs">Form</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <Settings size={20} />
                <span className="text-xs">Settings</span>
            </button>
            </nav>
        </div>
    );
}
