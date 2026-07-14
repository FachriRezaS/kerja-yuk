"use client"
import { Card, CardContent } from "@/components/ui/card";

export default function NewsWidget() {
    return (
        <Card className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 lg:col-span-2">
            <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 text-xl tracking-tight">PCS News</h3>
                    <button className="text-sm text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">View All</button>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                        <div className="flex items-center gap-4">
                            <img
                                src="/profile.jpg"
                                alt="Ana Riswati"
                                className="w-12 h-12 rounded-xl object-cover shadow-sm"
                            />
                            <div>
                                <p className="text-base font-bold text-gray-900">Ana Riswati</p>
                                <p className="text-xs font-medium text-gray-500">Senin 30 Mei 2022</p>
                            </div>
                        </div>
                        <span className="bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-lg font-bold tracking-wide">Announcement</span>
                    </div>
                    <p className="text-gray-700 text-base mb-4 font-medium leading-relaxed">
                        Weekly meeting update and project milestones discussion. Please make sure to prepare your progress reports.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-600 font-medium">
                        <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-50">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            Review Q3 Performance Metrics
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-50">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            Discuss upcoming UI/UX revamp for the mobile application
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
