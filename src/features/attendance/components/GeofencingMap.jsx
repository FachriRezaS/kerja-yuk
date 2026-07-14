"use client"
import { MapPin } from "lucide-react";

export default function GeofencingMap() {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative h-48 md:h-64">
            <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/14/13106/8410.png')] bg-cover bg-center opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">In Office Zone</span>
                    </div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <MapPin size={18} className="text-red-600" />
                        Menara Sahid, Sudirman
                    </h3>
                    <p className="text-xs text-gray-500 font-medium ml-6">Accuracy: 12 meters</p>
                </div>
            </div>
        </div>
    );
}
