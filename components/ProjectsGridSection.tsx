'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { ABOUT_END } from '@/lib/scrollTimings'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: '현대적인 쇼핑몰 플랫폼',
    description:
      'Next.js와 TypeScript로 구축한 반응형 이커머스 플랫폼입니다. Stripe 결제 시스템과 실시간 재고 관리 기능을 포함합니다.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'Real-time Chat App',
    subtitle: '실시간 채팅 애플리케이션',
    description:
      'Socket.io를 활용한 실시간 메시징 플랫폼으로, 그룹 채팅, 파일 공유, 이모지 반응 등의 기능을 제공합니다.',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    color: 'from-green-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'AI Dashboard',
    subtitle: 'AI 기반 분석 대시보드',
    description:
      '머신러닝 모델을 활용한 데이터 분석 및 시각화 대시보드입니다. D3.js를 사용한 인터랙티브 차트를 포함합니다.',
    tags: ['React', 'D3.js', 'Python', 'TensorFlow', 'FastAPI'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    subtitle: '모바일 뱅킹 애플리케이션',
    description:
      '생체 인증과 보안 기능을 갖춘 모바일 뱅킹 앱입니다. React Native로 크로스 플랫폼 개발했습니다.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    color: 'from-orange-500/20 to-red-500/20',
  },
]

export default function ProjectsGridSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Global progress to sync with AboutMe end
  const { scrollYProgress: globalProgress } = useScroll()
  // Local progress for section's own entrance motion
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'start 60%'],
  })

  // Gate opacity so Projects doesn't appear until AboutMe is nearly finished
  const gateOpacity = useTransform(globalProgress, [ABOUT_END - 0.01, ABOUT_END + 0.04], [0, 1], {
    clamp: true,
  })
  const localOpacity = useTransform(localProgress, [0, 1], [0, 1], { clamp: true })
  const localY = useTransform(localProgress, [0, 1], [80, 0], { clamp: true })

  const sectionOpacity = useTransform(
    [gateOpacity, localOpacity],
    ([g, o]) => Number(g) * Number(o),
  )
  const sectionY = useTransform(
    [gateOpacity, localY],
    ([g, y]) => Number(g) * Number(y) + (1 - Number(g)) * 80,
  )

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: sectionOpacity, y: sectionY, willChange: 'transform, opacity' }}
      className="py-20 px-6 bg-black relative z-0"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Projects</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            최신 기술을 활용한 다양한 프로젝트들을 소개합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />

              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <span className="text-white/40 text-lg">Project Preview</span>
                </div>

                {/* Overlay with links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    scale: hoveredId === project.id ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center gap-6"
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
                  >
                    <ExternalLink size={24} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
                  >
                    <Github size={24} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/60">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-white/80 text-lg mb-3">{project.subtitle}</p>

                <p className="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-white/10 text-white/80 rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs bg-white/10 text-white/60 rounded-full border border-white/20">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors text-center"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
                  >
                    View Code
                  </a>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow:
                    hoveredId === project.id
                      ? '0 0 30px rgba(255,255,255,0.1)'
                      : '0 0 0px rgba(255,255,255,0)',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
