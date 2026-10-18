import React, { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo';

export default function SignUpPage({ onNavigate }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const canvasRef = useRef(null);

  // Dynamic password strength evaluator
  useEffect(() => {
    let s = 0;
    if (password.length >= 4) s++;
    if (password.length >= 8 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) s++;
    if (password.length >= 10 && /[^A-Za-z0-9]/.test(password)) s++;
    setStrength(s);
  }, [password]);

  // WebGL Background Shader Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        vec3 color = vec3(0.985, 0.985, 0.99);

        // Gentle ambient light waves
        float wave = sin(uv.x * 3.0 + u_time * 0.4) * cos(uv.y * 3.0 + u_time * 0.3) * 0.03;
        color += vec3(wave * 0.5, wave * 0.7, wave);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type, src) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animationId;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('onboarding');
    }
  };

  return (
    <div className="bg-surface-base text-text-primary font-sans min-h-screen flex antialiased">
      <div className="flex w-full min-h-screen">
        
        {/* Left Panel: Apple-style Minimalist Storytelling (Hidden on mobile, 55% on desktop) */}
        <div className="hidden md:flex md:w-[55%] relative flex-col justify-between p-12 lg:p-16 overflow-hidden border-r border-border-subtle bg-[#FAFAFC]">
          
          {/* Ambient background shader */}
          <div className="absolute inset-0 w-full h-full opacity-60 z-0">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Logo Button */}
          <button 
            onClick={() => onNavigate('landing')} 
            className="relative z-10 self-start flex items-center hover:opacity-80 transition-opacity focus:outline-none"
            title="Back to home"
          >
            <Logo />
          </button>

          {/* Center: Apple-style Minimal Glassmorphic Financial Card */}
          <div className="relative z-10 flex-grow flex items-center justify-center py-6">
            <div className="w-full max-w-md relative">
              
              {/* Ambient blur glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

              {/* Main Frosted Glass Card */}
              <div className="relative bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-2xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-6">
                
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                  <div>
                    <div className="font-semibold text-base text-text-primary tracking-tight">Acme Corp Invoice</div>
                    <div className="text-xs text-text-secondary">INV-2024-891 • Oct 24, 2024</div>
                  </div>
                </div>

                {/* Amount Highlight */}
                <div className="bg-[#F8F9FB] rounded-xl p-5 border border-black/[0.04]">
                  <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Total Amount</div>
                  <div className="text-3xl font-semibold text-text-primary tracking-tight">$4,950.00</div>
                  <div className="mt-2 text-xs text-text-secondary flex items-center gap-2 font-normal">
                    <span>Subtotal: $4,500.00</span>
                    <span>•</span>
                    <span>Tax (10%): $450.00</span>
                  </div>
                </div>

                {/* Structured Fields Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="py-2.5 px-3.5 bg-white rounded-xl border border-black/[0.04]">
                    <div className="text-xs text-text-secondary">Quantity</div>
                    <div className="font-medium text-sm text-text-primary mt-0.5">12 Units</div>
                  </div>
                  
                  <div className="py-2.5 px-3.5 bg-white rounded-xl border border-black/[0.04]">
                    <div className="text-xs text-text-secondary">Currency</div>
                    <div className="font-medium text-sm text-text-primary mt-0.5">USD ($)</div>
                  </div>
                </div>

                {/* Bottom Auto-Sync Status */}
                <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between text-xs text-text-secondary">
                  <span className="flex items-center gap-1.5 text-text-primary font-medium">
                    <span className="material-symbols-outlined text-[15px] text-primary">bolt</span>
                    <span>Zero manual entry</span>
                  </span>
                  <span>Accuracy: 99.9%</span>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Copy */}
          <div className="relative z-10 max-w-md">
            <h1 className="text-3xl font-semibold text-text-primary mb-2.5 tracking-tight leading-tight">
              Build your financial data workspace.
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed font-normal">
              Automate document processing while keeping your team in total control.
            </p>
          </div>

        </div>

        {/* Right Panel: Form (100% on mobile, 45% on desktop) */}
        <div className="w-full md:w-[45%] bg-surface-base flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
          
          {/* Top Navigation Bar with Back to Home */}
          <div className="w-full flex items-center justify-between mb-4">
            <button 
              onClick={() => onNavigate('landing')} 
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary font-medium py-1.5 px-2.5 rounded-lg hover:bg-surface-soft transition-all focus:outline-none"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to home</span>
            </button>

            {/* Mobile-only Logo */}
            <div className="md:hidden cursor-pointer" onClick={() => onNavigate('landing')}>
              <Logo />
            </div>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[400px] mx-auto flex flex-col my-auto">

            <div className="mb-6">
              <h2 className="text-2xl md:text-[28px] font-semibold text-text-primary mb-1.5 tracking-tight">
                Create your workspace
              </h2>
              <p className="text-sm text-text-secondary">
                Set up your account and start processing invoices.
              </p>
            </div>

            {/* SSO Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button 
                type="button"
                onClick={() => onNavigate && onNavigate('onboarding')}
                className="w-full h-11 bg-white border border-border-strong hover:bg-surface-soft rounded-lg text-text-primary font-sans font-medium text-sm flex items-center justify-center gap-3 transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 shrink-0" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button 
                type="button"
                onClick={() => onNavigate && onNavigate('onboarding')}
                className="w-full h-11 bg-white border border-border-strong hover:bg-surface-soft rounded-lg text-text-primary font-sans font-medium text-sm flex items-center justify-center gap-3 transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 shrink-0" width="20" height="20" viewBox="0 0 21 21">
                  <path d="M1 1h9v9H1z" fill="#f25022"></path>
                  <path d="M1 11h9v9H1z" fill="#00a4ef"></path>
                  <path d="M11 1h9v9h-9z" fill="#7fba00"></path>
                  <path d="M11 11h9v9h-9z" fill="#ffb900"></path>
                </svg>
                <span>Continue with Microsoft</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-border-subtle"></div>
              <span className="mx-3 font-sans text-xs text-text-secondary uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-border-subtle"></div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              
              {/* Name Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-sans font-medium text-sm text-text-primary" htmlFor="firstName">First name</label>
                  <input 
                    className="w-full h-11 px-3.5 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                    id="firstName" 
                    placeholder="Jane" 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-sans font-medium text-sm text-text-primary" htmlFor="lastName">Last name</label>
                  <input 
                    className="w-full h-11 px-3.5 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                    id="lastName" 
                    placeholder="Doe" 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Work Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-medium text-sm text-text-primary" htmlFor="email">Work email</label>
                <input 
                  className="w-full h-11 px-3.5 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                  id="email" 
                  placeholder="jane@company.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-sans font-medium text-sm text-text-primary" htmlFor="password">Password</label>
                  
                  {/* Dynamic Strength Indicator */}
                  <div className="flex items-center gap-1">
                    <span className={`h-1 w-5 rounded-full transition-colors ${strength >= 1 ? (strength === 1 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-border-subtle'}`}></span>
                    <span className={`h-1 w-5 rounded-full transition-colors ${strength >= 2 ? 'bg-emerald-500' : 'bg-border-subtle'}`}></span>
                    <span className={`h-1 w-5 rounded-full transition-colors ${strength >= 3 ? 'bg-emerald-600' : 'bg-border-subtle'}`}></span>
                  </div>
                </div>

                <div className="relative">
                  <input 
                    className="w-full h-11 px-3.5 pr-10 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none" 
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-medium text-sm text-text-primary" htmlFor="confirmPassword">Confirm password</label>
                <input 
                  className="w-full h-11 px-3.5 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                  id="confirmPassword" 
                  placeholder="••••••••" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* CTA Button */}
              <button 
                className="w-full h-11 mt-1 bg-text-primary hover:bg-black text-white font-sans font-medium text-sm rounded-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center" 
                type="submit"
              >
                Create Account
              </button>

              {/* Terms */}
              <p className="font-sans text-xs text-text-secondary text-center mt-1">
                By creating an account, you agree to our <a className="text-text-primary underline hover:text-primary transition-colors" href="#">Terms</a> and <a className="text-text-primary underline hover:text-primary transition-colors" href="#">Privacy Policy</a>.
              </p>
            </form>

            {/* Footer Sign In Link */}
            <p className="font-sans text-sm text-text-secondary text-center mt-6">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('login')} 
                className="text-primary font-medium underline hover:text-primary/90 focus:outline-none"
              >
                Sign in
              </button>
            </p>

          </div>

          {/* Subtle empty spacer for vertical balance */}
          <div className="hidden md:block"></div>

        </div>

      </div>
    </div>
  );
}
