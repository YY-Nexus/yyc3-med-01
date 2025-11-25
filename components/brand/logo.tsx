"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "white" | "dark"
  showText?: boolean
  className?: string
  href?: string
  animated?: boolean
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
}

export function Logo({
  size = "md",
  variant = "default",
  showText = true,
  className,
  href = "/",
  animated = true,
}: LogoProps) {
  const logoContent = (
    <div
      className={cn("flex items-center gap-3 transition-all duration-300", animated && "hover:scale-105", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          sizeClasses[size],
          animated && "hover:rotate-3 transition-transform duration-300",
        )}
      >
        <Image src="/images/yanyu-cloud-logo.png" alt="言语云³ YanYu Cloud" fill className="object-contain" priority />
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
              textSizeClasses[size],
            )}
          >
            言语云³
          </span>
          <span
            className={cn(
              "text-xs text-blue-500 font-medium tracking-wider",
              size === "sm" && "text-[10px]",
              size === "lg" && "text-sm",
              size === "xl" && "text-base",
            )}
          >
            YanYu Cloud
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

export function AnimatedLogo({ className, ...props }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Logo {...props} animated />
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-20 animate-pulse" />
    </div>
  )
}
