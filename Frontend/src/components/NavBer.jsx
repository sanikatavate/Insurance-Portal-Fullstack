import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import {
    ChevronDown,
    Phone,
    ShieldCheck,
    FileText,
    Headphones,
    User,
    Menu,
    X,
} from "lucide-react";
import { useAuth } from "../contexts/useAuth";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const handleNav = (route) => {
        if (!route) return;
        navigate(route);
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const resolveRoute = (label) => {
        const v = String(label || "").toLowerCase();
        if (v.includes("health")) return "/health-insurance";
        if (v.includes("car") || v.includes("vehicle") || v.includes("bike")) return "/car-insurance";
        if (v.includes("term")) return "/term-insurance";
        if (v.includes("life")) return "/life-insurance";
        if (v.includes("travel")) return "/travel-insurance";
        if (v.includes("business")) return "/business-insurance";
        if (v.includes("home")) return "/home-insurance";

        if (v.includes("renew")) return "/dashboard/renewals";
        if (v.includes("claim") || v.includes("track existing claim")) return "/dashboard/claims";
        if (v.includes("payment")) return "/dashboard/payments";
        if (v.includes("manage policies")) return "/dashboard/policies";
        if (v.includes("help") || v.includes("support") || v.includes("chat")) return "/dashboard/ai-support";
        if (v.includes("download policy")) return "/dashboard/documents";

        return null;
    };

    const navItems = [
        {
        name: "Insurance Products",
        dropdown: [
            "Health Insurance",
            "Car Insurance",
            "Bike Insurance",
            "Life Insurance",
            "Travel Insurance",
            "Business Insurance",
        ],
        },
        {
        name: "Renew Your Policy",
        dropdown: [
            "Renew Health Policy",
            "Renew Vehicle Policy",
            "Renew Life Insurance",
            "Download Policy",
        ],
        },
        {
        name: "Claim",
        dropdown: [
            "File New Claim",
            "Track Existing Claim",
            "Claim Support",
            "Know Claim Process",
        ],
        },
        {
        name: "Support",
        dropdown: [
            "Track Payments",
            "Verify Advisor",
            "Manage Policies",
            "Communication Preferences",
            "Chat With Us",
            "Help Center",
        ],
        },
    ];

    return (
        <header className="w-full border-b border-gray-200 bg-white relative z-50">
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">

            {/* Left Side */}
            <div className="flex items-center gap-14">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                A
                </div>

                <div>
                <h1 className="text-2xl font-bold text-[#111827] leading-none">
                    Agile Insurance
                </h1>

                <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest">
                    Smart & Secure Protection
                </p>
                </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-10">
                <button
                onClick={() => handleNav("/")}
                className="text-[15px] font-medium text-gray-700 hover:text-blue-600 transition"
                >
                Home
                </button>

                {navItems.map((item, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <button className="flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition">
                    {item.name}
                    <ChevronDown size={16} />
                    </button>

                    {/* Dropdown */}
                    {activeDropdown === index && (
                    <div className="absolute left-0 w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
                        <div className="flex flex-col gap-2">
                        {item.dropdown.map((option, i) => (
                            <button
                            key={i}
                            onClick={() => handleNav(resolveRoute(option))}
                            className="text-left px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                            {option}
                            </button>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

            <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
                className="inline-flex lg:hidden items-center justify-center rounded-xl border border-gray-200 p-2 text-gray-700"
            >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Talk To Expert */}
            <button className="hidden md:flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-3 rounded-2xl font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Phone size={18} />
                Talk to Expert
            </button>

            {/* Sign In */}
            <button
                onClick={() =>
                    handleNav(
                        isAuthenticated
                            ? user?.role === "admin"
                                ? "/admin/dashboard"
                                : user?.role === "agent"
                                    ? "/agent/dashboard"
                                    : "/dashboard"
                            : "/auth",
                    )
                }
                className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            >
                <User size={18} />
                {isAuthenticated ? (user?.fullName?.split(" ")?.[0] ?? "Dashboard") : "Sign In"}
            </button>
            </div>
        </div>

        {mobileMenuOpen && (
            <div className="border-t border-gray-100 bg-white lg:hidden">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                <button
                onClick={() => handleNav("/")}
                className="text-left rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                >
                Home
                </button>

                {navItems.map((item, index) => (
                <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-3">
                    {item.name}
                    </p>
                    <div className="flex flex-col gap-2">
                    {item.dropdown.map((option, i) => (
                        <button
                        key={i}
                        onClick={() => handleNav(resolveRoute(option))}
                        className="text-left rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600"
                        >
                        {option}
                        </button>
                    ))}
                    </div>
                </div>
                ))}

                <button
                onClick={() => handleNav("/dashboard/ai-support")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600"
                >
                <Phone size={16} />
                Talk to Expert
                </button>
            </div>
            </div>
        )}

        {/* Bottom Quick Features */}
        <div className="hidden xl:flex items-center justify-center gap-10 border-t border-gray-100 py-3 bg-[#f8fbff]">
            <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={18} className="text-blue-600" />
            Trusted Insurance Protection
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText size={18} className="text-blue-600" />
            Fast Claim Processing
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
            <Headphones size={18} className="text-blue-600" />
            24/7 Customer Support
            </div>
        </div>
        </header>
    );
    };

    export default Navbar;
