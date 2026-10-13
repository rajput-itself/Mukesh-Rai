import React, { useState } from 'react';
import { ArrowUpRight, Mail, Copy, Check, Send, Loader2, AlertCircle } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', message: '', website: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@aaprin.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const endpoint = import.meta.env.VITE_CONTACT_API_URL || '/api/contact.php';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setFormSubmitted(true);
        setFormData({ name: '', organization: '', email: '', message: '', website: '' });
      } else {
        const errorText = result?.error || 'Failed to submit inquiry. Please try again or email directly.';
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage('Network error connecting to server. Please check your connection or contact via direct email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08] relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <SectionLabel number="09" label="Executive Inquiries & Advisory" />

      <div className="my-8 sm:my-10 md:my-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 block">
            Philosophy On Systems & Impact
          </span>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white tracking-tight leading-snug">
            “The best technology disappears into the experience — leaving only the durable commercial impact behind.”
          </blockquote>
        </div>

        <div className="lg:col-span-5 space-y-2 sm:space-y-3 lg:border-l lg:border-white/10 lg:pl-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white">
            Let's build <span className="text-blue-400">what's next.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Seeking strategic board advisory, enterprise platform architecture, or technology leadership partnership? Connect directly below.
          </p>
        </div>
      </div>

      <div className="bg-[#0b0d13] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 p-5 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.01]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
              Direct Channels
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Executive Contact Points
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Direct communication line for board advisory, architecture consulting, and enterprise technology leadership.
            </p>
          </div>

          <div className="my-6 sm:my-8 space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Official Email</span>
                  <a
                    href="mailto:contact@aaprin.com"
                    className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-blue-400 transition-colors truncate block"
                  >
                    contact@aaprin.com
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Copy Email Address"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-3">
              Verified Networks
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.05] transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Network</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://aaprin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.05] transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Site</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">aaprin.com</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
              Executive Transmission
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              Initiate Conversation
            </h3>
          </div>

          {formSubmitted ? (
            <div className="my-auto p-8 rounded-xl bg-blue-950/30 border border-blue-500/40 text-center space-y-3">
              <Check className="w-8 h-8 text-blue-400 mx-auto" />
              <h4 className="text-lg font-semibold text-white">Transmission Received</h4>
              <p className="text-xs font-mono text-slate-400">
                Thank you for reaching out. The executive office will review your inquiry shortly.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs font-mono text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-org" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      id="contact-org"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company or organization name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Nature of Inquiry / Scope *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project scope, technology requirements, or strategic initiative..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 sm:py-4 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-900/20 cursor-pointer active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
