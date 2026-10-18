import React, { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo';

export default function LoginPage({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canvasRef = useRef(null);

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
      onNavigate('dashboard');
    }
  };

  return (
    <div className="bg-surface-base text-text-primary font-sans antialiased h-screen w-screen overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT SIDE (55%): Apple-inspired Minimalist Storytelling */}
      <div className="hidden md:flex flex-col w-[55%] h-full bg-[#FAFAFC] relative border-r border-border-subtle p-12 lg:p-16 justify-between overflow-hidden">
        
        {/* Ambient background shader */}
        <div className="absolute inset-0 z-0 opacity-60">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Logo Button */}
        <button 
          onClick={() => onNavigate('landing')} 
          className="z-10 self-start flex items-center hover:opacity-80 transition-opacity focus:outline-none"
          title="Back to home"
        >
          <Logo />
        </button>

        {/* Center: Apple-style Minimal Glassmorphic Showcase */}
        <div className="z-10 relative flex-grow flex items-center justify-center py-6">
          <div className="w-full max-w-md relative">
            
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

            {/* Main Minimalist Glass Card */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-2xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-6">
              
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <div>
                  <div className="font-semibold text-base text-text-primary tracking-tight">Acme Cloud Enterprise</div>
                  <div className="text-xs text-text-secondary">INV-2024-891 • Oct 24, 2024</div>
                </div>
              </div>

              {/* Big Clean Metric */}
              <div className="bg-[#F8F9FB] rounded-xl p-5 border border-black/[0.04]">
                <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Total Processed</div>
                <div className="text-3xl font-semibold text-text-primary tracking-tight">$4,950.00</div>
                <div className="mt-2 text-xs text-text-secondary flex items-center gap-2 font-normal">
                  <span>Subtotal: $4,500.00</span>
                  <span>•</span>
                  <span>Tax (10%): $450.00</span>
                </div>
              </div>

              {/* Clean minimal line item pills */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs py-2.5 px-3.5 bg-white rounded-xl border border-black/[0.04]">
                  <span className="text-text-secondary">Dedicated Server Cluster (12 mo)</span>
                  <span className="font-medium text-text-primary">$4,500.00</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2.5 px-3.5 bg-white rounded-xl border border-black/[0.04]">
                  <span className="text-text-secondary">Standard Tax Exemption Code</span>
                  <span className="font-medium text-text-primary">10% Applied</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Typography Bottom */}
        <div className="z-10 max-w-md">
          <h1 className="text-3xl font-semibold text-text-primary mb-2.5 tracking-tight leading-tight">
            Financial data,<br />organized automatically.
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed font-normal">
            Process invoices with zero manual data entry and instant precision.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE (45%): Authentication Form */}
      <div className="w-full md:w-[45%] h-full bg-surface-base flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
        
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
        <div className="w-full max-w-[380px] mx-auto flex flex-col my-auto">
          
          {/* Header */}
          <div className="w-full mb-8">
            <h2 className="text-2xl md:text-[28px] font-semibold text-text-primary mb-1.5 tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-text-secondary">
              Sign in to continue to your workspace.
            </p>
          </div>

          {/* SSO Buttons */}
          <div className="w-full space-y-3 mb-6">
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="w-full h-11 flex items-center justify-center gap-3 px-4 bg-white border border-border-strong hover:bg-surface-soft transition-all font-sans font-medium text-sm text-text-primary rounded-lg shadow-2xs"
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
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="w-full h-11 flex items-center justify-center gap-3 px-4 bg-white border border-border-strong hover:bg-surface-soft transition-all font-sans font-medium text-sm text-text-primary rounded-lg shadow-2xs"
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
          <div className="w-full flex items-center gap-3 mb-6">
            <div className="h-px bg-border-subtle flex-1"></div>
            <span className="font-sans text-xs text-text-secondary uppercase tracking-wider">or</span>
            <div className="h-px bg-border-subtle flex-1"></div>
          </div>

          {/* Email Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block font-sans font-medium text-sm text-text-primary" htmlFor="email">
                Work email
              </label>
              <input 
                className="w-full h-11 bg-surface-soft border border-border-subtle rounded-lg px-3.5 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                id="email" 
                name="email" 
                placeholder="name@company.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-sans font-medium text-sm text-text-primary" htmlFor="password">
                  Password
                </label>
                <a className="font-sans text-xs text-primary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input 
                  className="w-full h-11 bg-surface-soft border border-border-subtle rounded-lg px-3.5 pr-10 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors focus:outline-none" 
                  onClick={() => setShowPassword(!showPassword)} 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <button 
              className="w-full h-11 bg-text-primary hover:bg-black text-white font-sans font-medium text-sm rounded-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all mt-2" 
              type="submit"
            >
              Sign in
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 text-center w-full">
            <span className="font-sans text-sm text-text-secondary">Don't have an account? </span>
            <button 
              onClick={() => onNavigate('signup')} 
              className="font-sans text-sm text-primary font-medium hover:underline focus:outline-none"
            >
              Create account
            </button>
          </div>

        </div>

        {/* Subtle empty spacer for vertical balance */}
        <div className="hidden md:block"></div>

      </div>

    </div>
  );
}
