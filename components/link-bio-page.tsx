import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProfileSection } from "./profile-section"
import { LinkCard } from "./link-card"
import { SocialFooter } from "./social-footer"

interface LinkData {
  title: string
  href: string
  icon: string
  description?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 25,
    },
  },
}

export function LinkBioPage() {
  const [links, setLinks] = useState<LinkData[]>([])

  useEffect(() => {
    fetch("/links.json")
      .then((res) => res.json())
      .then(setLinks)
      .catch(() => {})
  }, [])

  return (
    <main className="relative min-h-screen px-6 py-10 flex flex-col bg-[#0a0a0a]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#0a0a0a]" />

      {/* Ambient background blobs — pure CSS animations, no JS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.015,
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-[400px] w-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="pt-2">
          <ProfileSection
            name="Shinigami"
            bio="Indonesia's Largest Webcomic Community"
            imageUrl="/avatar.webp"
          />
        </motion.div>

        <motion.div className="space-y-3 py-8" variants={containerVariants}>
          {links.map((link) => (
            <motion.div key={link.title} variants={itemVariants}>
              <LinkCard {...link} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="pb-2">
          <SocialFooter />
        </motion.div>
      </motion.div>
    </main>
  )
}
