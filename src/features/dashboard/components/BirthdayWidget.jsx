"use client"
import { Card, CardContent } from "@/components/ui/card";

export default function BirthdayWidget() {
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between relative">
                <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-50 rounded-bl-full -z-10"></div>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-yellow-100 p-1">
                        <img src="/profile.jpg" alt="Birthday" className="w-full h-full rounded-full object-cover border-2 border-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-yellow-600 flex items-center gap-2">
                            🎉 Ulang Tahun Hari Ini!
                        </p>
                        <h4 className="text-lg font-bold text-gray-900 mt-0.5">Budi Santoso</h4>
                    </div>
                </div>
                <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap">
                    Ucapkan
                </button>
            </CardContent>
        </Card>
    );
}
