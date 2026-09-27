"use client";

import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-panel p-6 ${className}`}>{children}</div>;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles = {
    primary: "bg-accent text-white hover:bg-accent/90",
    ghost: "bg-white/5 text-white hover:bg-white/10",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20",
  }[variant];
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    />
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-line bg-base px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "green" | "red" }) {
  const styles = {
    default: "bg-white/10 text-white/70",
    green: "bg-emerald-500/15 text-emerald-400",
    red: "bg-red-500/15 text-red-400",
  }[tone];
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>{children}</span>;
}
