"use client"
import { Bell, Moon, Sun, Shield, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function SettingsPage() {
    const { darkMode, setDarkMode } = useTheme();
    const [notifications, setNotifications] = useState(true);

    return (
        <DashboardLayout title="Settings">
            <div className="p-4 md:p-6 min-h-screen transition-colors duration-300 bg-transparent text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <div className="max-w-3xl mx-auto space-y-6">
                
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Preferences</h3>
                    
                    <div className="space-y-3">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300">
                                    {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Dark Mode</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce glare and eye strain</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                        
                        {/* Notifications Toggle */}
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Push Notifications</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts on your device</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Account & Security</h3>
                    
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                        <div role="button" tabIndex={0} className="w-full cursor-pointer flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700">
                            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">Change Password</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Update your security credentials</p>
                            </div>
                        </div>

                        <div role="button" tabIndex={0} className="w-full cursor-pointer flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700">
                            <div className="p-2.5 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">Help & Support</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get assistance with your account</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-red-600 font-bold bg-red-50 hover:bg-red-100 transition-colors">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
