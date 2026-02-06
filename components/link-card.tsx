import type { ComponentType, SVGProps } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Globe,
  Sparkles,
  Coffee,
  FileText,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react"
import { DiscordIcon } from "./icons/discord"

const iconMap: Record<string, LucideIcon | ComponentType<SVGProps<SVGSVGElement>>> = {
  globe: Globe,
  sparkles: Sparkles,
  coffee: Coffee,
  "file-text": FileText,
  discord: DiscordIcon,
  link: LinkIcon,
}

interface LinkCardProps {
  title: string
  description?: string
  href: string
  icon: string
}

export function LinkCard({ title, description, href, icon }: LinkCardProps) {
  const Icon = iconMap[icon] || LinkIcon

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          0 0 0 1px rgba(255, 255, 255, 0.08)
        `,
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          0 0 0 1px rgba(255, 255, 255, 0.12),
          0 8px 32px rgba(0, 0, 0, 0.4)
        `,
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03), transparent 70%)",
        }}
      />

      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-neutral-300"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <div className="relative flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-white tracking-tight">{title}</h3>
        {description && <p className="text-[12px] text-neutral-500 truncate mt-0.5">{description}</p>}
      </div>

      <ChevronRight
        className="relative h-5 w-5 text-neutral-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-400"
        strokeWidth={2}
      />
    </motion.a>
  )
}
