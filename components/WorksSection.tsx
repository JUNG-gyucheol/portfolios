'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe',
    image: '/api/placeholder/600/400',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2024',
    role: 'Full Stack Developer',
  },
  {
    id: 2,
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat app with real-time messaging',
    image: '/api/placeholder/600/400',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2024',
    role: 'Frontend Developer',
  },
  {
    id: 3,
    title: 'AI Dashboard',
    description: 'Analytics dashboard with AI-powered insights',
    image: '/api/placeholder/600/400',
    tags: ['React', 'D3.js', 'Python', 'TensorFlow'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2023',
    role: 'UI/UX Designer & Developer',
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    image: '/api/placeholder/600/400',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2023',
    role: 'Mobile Developer',
  },
]

export default function WorksSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="works" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
          <p className="text-xl text-white/60">A collection of projects I've worked on</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="aspect-[3/2] relative bg-gradient-to-br from-white/10 to-white/5">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-lg">Project Image</span>
                  </div>

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
                  >
                    <a
                      href={project.liveUrl}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                      aria-label="View live project"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                      aria-label="View on GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className="text-sm text-white/40">{project.year}</span>
                  </div>

                  <p className="text-white/60 mb-4">{project.description}</p>

                  <p className="text-sm text-white/40 mb-4">Role: {project.role}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border border-white/20 text-white/60 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
