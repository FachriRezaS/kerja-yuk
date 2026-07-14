"use client"
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
    const { login, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("password123");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate network delay for effect
        setTimeout(() => {
            const res = login(email, password);
            if (!res.success) {
                setError(res.message);
                setIsLoading(false);
            }
        }, 1000);
    };

    if (user) return null; // Wait for redirect

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 font-sans p-4 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse dark:bg-red-900/30 dark:mix-blend-normal"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse dark:bg-blue-900/30 dark:mix-blend-normal" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10 flex-col md:flex-row">
                
                {/* Left Side: Branding / Visuals */}
                <div className="w-full md:w-5/12 bg-gradient-to-br from-red-600 to-red-800 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-lg mb-8">
                            <span className="font-black text-2xl">K</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight leading-tight">
                            Elevate your<br/>workplace<br/>experience.
                        </h1>
                        <p className="mt-4 text-red-100/80 font-medium">
                            KerjaYuk! is the modern HRIS platform designed for high-performing teams.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 hidden md:block">
                        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-sm">"The best HR tool we've used."</p>
                                    <p className="text-xs text-red-200">Sarah J., HR Director</p>
                                </div>
                            </div>
                            <div className="flex gap-1 text-yellow-400">
                                {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Please enter your details to sign in.</p>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-3 border border-red-100 dark:border-red-800">
                                <span className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input 
                                        type="email" 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-red-500 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all text-gray-900 dark:text-white font-medium"
                                        placeholder="budi@kerja.yuk"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        type="password" 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-red-500 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all text-gray-900 dark:text-white font-medium tracking-widest"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <a href="#" className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 transition-colors">Forgot password?</a>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">Demo Accounts:</p>
                            <div className="space-y-3">
                                <button onClick={() => setEmail("budi@kerja.yuk")} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 transition-colors text-left bg-white dark:bg-gray-800">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">Staff Account</p>
                                        <p className="text-xs text-gray-500">budi@kerja.yuk</p>
                                    </div>
                                    {email === "budi@kerja.yuk" && <CheckCircle2 size={18} className="text-red-500" />}
                                </button>
                                <button onClick={() => setEmail("manager@kerja.yuk")} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-left bg-white dark:bg-gray-800">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">Manager Account</p>
                                        <p className="text-xs text-gray-500">manager@kerja.yuk</p>
                                    </div>
                                    {email === "manager@kerja.yuk" && <CheckCircle2 size={18} className="text-blue-500" />}
                                </button>
                                <button onClick={() => setEmail("hrd@kerja.yuk")} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-left bg-white dark:bg-gray-800">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">HRD Account</p>
                                        <p className="text-xs text-gray-500">hrd@kerja.yuk</p>
                                    </div>
                                    {email === "hrd@kerja.yuk" && <CheckCircle2 size={18} className="text-purple-500" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
