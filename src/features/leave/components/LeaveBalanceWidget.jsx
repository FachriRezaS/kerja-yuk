"use client"
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LeaveBalanceWidget() {
    const router = useRouter();

    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/leave")}>
            <CardContent className="p-6 flex items-center gap-6 relative">
                <div className="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10"></div>
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                    <CalendarCheck size={32} className="text-red-600" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Sisa Cuti Tahunan</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-gray-900">5</span>
                        <span className="font-semibold text-gray-500">Hari</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
