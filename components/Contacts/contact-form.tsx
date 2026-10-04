"use client";

import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useContactForm } from "./hooks/useContactForm";

export default function ContactForm() {
  const { formData, status, errorMsg, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Visual Hero Background */}
      <div className="relative pt-12 lg:pt-16 pb-8">
        <div className="absolute top-0 left-0 w-full h-80 overflow-hidden -z-10 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[100%] bg-blue-100/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[40%] h-[80%] bg-purple-100/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            Let&apos;s Build the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future Together</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 font-medium">
            Have a project in mind or just want to chat about AI? We&apos;re always open to new ideas and collaborations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Direct Channels</h2>
            
            <div className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:border-blue-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <FiMail size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email Us</h3>
                  <p className="text-base font-bold text-gray-900">sachin.developer32@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:border-indigo-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Call Us</h3>
                  <p className="text-base font-bold text-gray-900">+91-8434275032</p>
                </div>
              </div>
            </div>

            <div className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:border-purple-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Find Us</h3>
                  <p className="text-base font-bold text-gray-900">Mithila, Bihar, India</p>
                </div>
              </div>
            </div>

            {/* Social Proof area */}
            <div className="relative mt-10 p-6 bg-gray-900 rounded-[2rem] overflow-hidden text-white shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <h4 className="text-lg font-bold mb-3">Quick Response Hub</h4>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 font-medium">
                Our team responds within 24 hours during business days. For urgent matters, use phone support.
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                System Online
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
              <div className="relative bg-white border border-gray-100 rounded-[2rem] p-6 md:p-10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 ml-1">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none text-sm"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                      <FiAlertCircle size={16} />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-95 ${
                      status === 'success'
                        ? 'bg-green-600 text-white shadow-green-500/20'
                        : status === 'error'
                        ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                        : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        <FiCheckCircle size={20} />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <FiSend />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
