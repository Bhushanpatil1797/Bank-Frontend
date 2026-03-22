import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, X, Lock, Mail, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/apiServices";

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);

  const isSuccess = type === "success";
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl min-w-[280px] max-w-[360px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
      isSuccess
        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
        : "border-red-400/30 bg-red-400/10 text-red-400"
    }`}>
      {isSuccess
        ? <CheckCircle size={20} className="shrink-0" />
        : <XCircle size={20} className="shrink-0" />}
      <p className="text-[13px] font-medium flex-1 m-0">{message}</p>
      <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-inherit opacity-60 flex p-0 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════
   GRID BACKGROUND
═══════════════════════════════════════ */
function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#03071e_0%,#05103a_40%,#0a0a2e_70%,#03071e_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_50%,rgba(29,78,216,0.22)_0%,transparent_60%),radial-gradient(ellipse_50%_70%_at_80%_20%,rgba(109,40,217,0.18)_0%,transparent_55%),radial-gradient(ellipse_40%_40%_at_60%_85%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute inset-0 mix-blend-screen" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,50,255,0.015) 2px, rgba(0,50,255,0.015) 4px)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════ */
function Particles() {
  const pts = [
    { s:3, t:"8%",  l:"5%",  c:"#60a5fa", d:"3.2s", dl:"0s"   },
    { s:2, t:"20%", l:"88%", c:"#a78bfa", d:"2.8s", dl:"0.7s"  },
    { s:4, t:"65%", l:"8%",  c:"#38bdf8", d:"3.5s", dl:"1.2s"  },
    { s:2, t:"82%", l:"80%", c:"#818cf8", d:"2.3s", dl:"0.4s"  },
    { s:3, t:"42%", l:"2%",  c:"#22d3ee", d:"3.8s", dl:"1.8s"  },
    { s:2, t:"10%", l:"50%", c:"#a78bfa", d:"2.6s", dl:"0.9s"  },
    { s:3, t:"92%", l:"35%", c:"#60a5fa", d:"3.1s", dl:"1.5s"  },
    { s:2, t:"30%", l:"92%", c:"#22d3ee", d:"2.9s", dl:"0.2s"  },
    { s:4, t:"55%", l:"96%", c:"#38bdf8", d:"3.3s", dl:"2.1s"  },
    { s:2, t:"75%", l:"52%", c:"#c084fc", d:"2.7s", dl:"0.6s"  },
  ];
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: p.s, height: p.s, top: p.t, left: p.l,
          background: p.c, boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
          animation: `ptFloat ${p.d} ease-in-out infinite ${p.dl}`,
        }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   BRAND PANEL — LEFT
═══════════════════════════════════════ */
function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative px-12 py-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute w-[480px] h-[480px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[40px]"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)", animation: "ambPulse 6s ease-in-out infinite" }}
      />
      {/* Orbit rings */}
      {[
        { sz: 360, spd: 24, rev: false, dot: 9, dc: "#38bdf8", bc: "rgba(56,189,248,0.12)" },
        { sz: 270, spd: 17, rev: true,  dot: 7, dc: "#a78bfa", bc: "rgba(167,139,250,0.12)" },
        { sz: 185, spd: 11, rev: false, dot: 5, dc: "#22d3ee", bc: "rgba(34,211,238,0.15)" },
      ].map((r, i) => (
        <div key={i} className="absolute rounded-full top-1/2 left-1/2 pointer-events-none" style={{
          width: r.sz, height: r.sz,
          border: `1px solid ${r.bc}`,
          animation: `orbitSpin ${r.spd}s linear infinite ${r.rev ? "reverse" : "normal"}`,
        }}>
          <div className="absolute rounded-full" style={{
            width: r.dot, height: r.dot,
            background: r.dc, boxShadow: `0 0 14px ${r.dc}`,
            top: `calc(-${r.dot / 2}px)`, left: "50%", transform: "translateX(-50%)",
          }} />
        </div>
      ))}
      {/* Logo + text */}
      <div className="relative z-10 flex flex-col items-center" style={{ animation: "logoIn 1s cubic-bezier(.16,1,.3,1) both .3s" }}>
        <div className="relative mb-7" style={{ animation: "hexFloat 5s ease-in-out infinite" }}>
          <div className="absolute -inset-[18px] rounded-full blur-[18px]"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 65%)", animation: "ambPulse 3s ease-in-out infinite" }}
          />
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.2)" stroke="url(#hs3)" strokeWidth="1.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="url(#tg3)" textAnchor="middle">P</text>
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.9)" />
            ))}
            <defs>
              <linearGradient id="hs3" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(56,189,248,0.9)" />
                <stop offset="50%"  stopColor="rgba(129,140,248,0.6)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.9)" />
              </linearGradient>
              <linearGradient id="tg3" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#fff" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.85)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[62px] font-black text-white tracking-[-3px] leading-none" style={{ textShadow: "0 0 40px rgba(255,255,255,0.15)" }}>Pay</span>
          <span className="font-serif text-[62px] font-black tracking-[-3px] leading-none bg-clip-text text-transparent bg-[length:200%]"
            style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #38bdf8 90%)", animation: "shimmer 3s linear infinite" }}>
            Zen
          </span>
        </div>

        <div className="h-[3px] rounded-full my-2.5 mx-auto bg-[length:200%]"
          style={{ background: "linear-gradient(90deg, #2563eb, #38bdf8, #818cf8, #38bdf8, #2563eb)", animation: "ulGrow .9s cubic-bezier(.22,1,.36,1) forwards 1s, shimmer 3s linear infinite 1.5s", width: 0 }}
        />

        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[rgba(180,210,255,0.35)] mb-7 opacity-0"
          style={{ animation: "fadeUp .7s ease both 1.2s" }}>Private Banking</p>

        <p className="text-sm font-light text-center leading-[1.8] max-w-[240px] text-[rgba(180,210,255,0.5)] opacity-0"
          style={{ animation: "fadeUp .7s ease both 1.4s" }}>
          Secure, intelligent banking <br />always at your fingertips.
        </p>

        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-[rgba(100,160,255,0.35)] whitespace-nowrap mt-3.5 opacity-0"
          style={{ animation: "fadeUp .7s ease both 1.5s" }}>Secure · Smart · Banking</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MOBILE LOGO — only shown on small screens
═══════════════════════════════════════ */
function MobileLogo() {
  return (
    <div className="flex lg:hidden flex-col items-center mb-5">
      <svg width="46" height="46" viewBox="0 0 100 100" fill="none" className="mb-1.5">
        <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.25)" stroke="rgba(56,189,248,0.8)" strokeWidth="2" />
        <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">P</text>
      </svg>
      <div className="flex items-baseline gap-0.5">
        <span className="font-serif text-2xl font-black text-white tracking-[-1px]">Pay</span>
        <span className="font-serif text-2xl font-black tracking-[-1px] bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg,#38bdf8,#818cf8)" }}>Zen</span>
      </div>
      <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(180,210,255,0.35)] mt-0.5">Private Banking</p>
    </div>
  );
}

/* ═══════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData]         = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [alertActive, setAlertActive]   = useState(false);
  const [shakeCard, setShakeCard]       = useState(false);
  const [toast, setToast]               = useState({ show: false, message: "", type: "" });
  const [focusedField, setFocusedField] = useState(null);

  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = () => setToast({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (alertActive) setAlertActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const result = await loginUser(formData.email, formData.password);
    if (!result.ok) {
      const msg = result.data?.message || "Invalid Credentials!";
      showToast(msg, "error"); setLoading(false); return;
    }
    showToast("Login Successful! ", "success");
    localStorage.setItem("payzen_user", JSON.stringify(result.data.user));
    localStorage.setItem("payzen_token", result.data.token);
    setTimeout(() => navigate("/dashboard"), 1500);
    setLoading(false);
  };

  // Dynamic input classes — mirrors original inputStyle logic exactly
  const inputClass = (name) =>
    `w-full pl-[38px] ${name === "password" ? "pr-10" : "pr-4"} py-3 rounded-xl text-[13px] text-[#e2e8f0] outline-none transition-all duration-200 border ${
      alertActive
        ? "bg-red-500/[0.06] border-red-500/50"
        : focusedField === name
        ? "bg-indigo-500/[0.08] border-indigo-500/60"
        : "bg-white/[0.04] border-indigo-500/20"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes ptFloat   { 0%,100%{transform:translateY(0) scale(1);opacity:.2} 50%{transform:translateY(-18px) scale(1.6);opacity:.9} }
        @keyframes hexFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ambPulse  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes shimmer   { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes ulGrow    { from{width:0} to{width:200px} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes logoIn    { from{opacity:0;transform:scale(.88) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes cardIn    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes scanPulse { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes shakeX    { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-7px)} 20%,40%,60%,80%{transform:translateX(7px)} }
        @keyframes alertPulse{ 0%,100%{opacity:0} 50%{opacity:1} }
        input::placeholder { color: rgba(148,163,184,0.3); }
        input { font-family: inherit; }
        * { box-sizing: border-box; }
      `}</style>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-6"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        <GridBackground />
        <Particles />

        <div className="relative z-10 flex items-center w-full max-w-[1100px]">
          <BrandPanel />

          {/* ════ LOGIN CARD ════ */}
          <div className="w-full max-w-[460px] mx-auto"
            style={{ animation: shakeCard ? "shakeX 0.5s ease-in-out" : "cardIn .8s cubic-bezier(.16,1,.3,1) both .1s" }}>

            <div className={`rounded-3xl border backdrop-blur-[32px] p-9 max-lg:p-[18px] max-lg:rounded-[18px] transition-all duration-400 ${
              alertActive
                ? "bg-[rgba(60,8,8,0.7)] border-red-500/35 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_80px_rgba(239,68,68,0.2)]"
                : "bg-[rgba(8,16,60,0.7)] border-indigo-500/20 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_80px_rgba(0,0,0,0.6),0_0_100px_rgba(37,99,235,0.12)]"
            }`}>

              <MobileLogo />

              {/* Heading */}
              <div className="text-center mb-7">
                <h2 className={`text-[26px] max-lg:text-[22px] font-extrabold tracking-[-0.03em] m-0 mb-1.5 transition-colors duration-400 ${
                  alertActive ? "text-red-300" : "text-slate-100"
                }`}>
                  User Login
                </h2>
                <p className="text-[13px] font-normal text-[rgba(148,163,184,0.6)] m-0">
                  Access Your Banking Dashboard Safely
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[rgba(148,163,184,0.8)] mb-1.5 tracking-[0.05em]">
                      Email Address <span className="text-[#f87171]">*</span>
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex transition-colors duration-300 ${
                        alertActive ? "text-red-500/60" : "text-indigo-500/60"
                      }`}>
                        <Mail size={14} />
                      </span>
                      <input type="email" name="email" placeholder="you@email.com"
                        value={formData.email} onChange={handleChange} required
                        onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                        autoComplete="email"
                        className={inputClass("email")} />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[rgba(148,163,184,0.8)] mb-1.5 tracking-[0.05em]">
                      Password <span className="text-[#f87171]">*</span>
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex transition-colors duration-300 ${
                        alertActive ? "text-red-500/60" : "text-indigo-500/60"
                      }`}>
                        <Lock size={14} />
                      </span>
                      <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password"
                        value={formData.password} onChange={handleChange} required
                        onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                        className={inputClass("password")} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-indigo-500/50 flex p-0 hover:text-indigo-400 transition-colors">
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[rgba(148,163,184,0.55)]">
                      <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange}
                        className="accent-indigo-500 w-3.5 h-3.5" />
                      Remember Me
                    </label>
                    <button type="button" onClick={() => navigate("/forgot")}
                      className="bg-transparent border-none cursor-pointer text-[12px] font-semibold text-[#818cf8] hover:text-indigo-300 transition-colors p-0"
                      style={{ fontFamily: "inherit" }}>
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className={`w-full mt-1 py-3.5 px-6 rounded-[14px] border-none text-white text-sm font-bold tracking-[0.02em] transition-all duration-300 flex items-center justify-center gap-2 bg-[length:200%] ${
                      loading
                        ? "bg-indigo-700/50 cursor-not-allowed shadow-none"
                        : alertActive
                        ? "bg-[linear-gradient(135deg,#dc2626,#b91c1c)] cursor-pointer shadow-[0_4px_28px_rgba(220,38,38,0.45)]"
                        : "bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_50%,#4f46e5_100%)] cursor-pointer shadow-[0_4px_28px_rgba(79,70,229,0.45),0_0_50px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_36px_rgba(79,70,229,0.6)]"
                    }`}
                    style={{ fontFamily: "inherit", animation: !loading && !alertActive ? "shimmer 3s linear infinite" : "none" }}>
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                          style={{ animation: "spin 0.7s linear infinite" }} />
                        Verifying...
                      </>
                    ) : (
                      <> Login </>
                    )}
                  </button>

                  {loading && (
                    <p className="text-center text-[11px] text-[rgba(148,163,184,0.4)] m-0"
                      style={{ animation: "scanPulse 1.5s ease-in-out infinite" }}>
                      Verifying Secure Access...
                    </p>
                  )}

                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[10px] tracking-[0.15em] text-white/20 uppercase">or</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Register link */}
              <p className="text-center text-[13px] text-[rgba(148,163,184,0.5)] m-0">
                Don't have an account?{" "}
                <button onClick={() => navigate("/registration")}
                  className="bg-transparent border-none cursor-pointer font-bold text-[#818cf8] hover:text-indigo-300 transition-colors text-[13px] p-0"
                  style={{ fontFamily: "inherit" }}>
                  Register here
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}