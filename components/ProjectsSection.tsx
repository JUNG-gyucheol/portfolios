'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: '현대적인 쇼핑몰 플랫폼',
    description: 'Next.js와 TypeScript로 구축한 반응형 이커머스 플랫폼입니다. Stripe 결제 시스템과 실시간 재고 관리 기능을 포함합니다.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
    image: '/api/placeholder/800/500',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'Real-time Chat App',
    subtitle: '실시간 채팅 애플리케이션',
    description: 'Socket.io를 활용한 실시간 메시징 플랫폼으로, 그룹 채팅, 파일 공유, 이모지 반응 등의 기능을 제공합니다.',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    image: '/api/placeholder/800/500',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    color: 'from-green-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'AI Dashboard',
    subtitle: 'AI 기반 분석 대시보드',
    description: '머신러닝 모델을 활용한 데이터 분석 및 시각화 대시보드입니다. D3.js를 사용한 인터랙티브 차트를 포함합니다.',
    tags: ['React', 'D3.js', 'Python', 'TensorFlow', 'FastAPI'],
    image: '/api/placeholder/800/500',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    subtitle: '모바일 뱅킹 애플리케이션',
    description: '생체 인증과 보안 기능을 갖춘 모바일 뱅킹 앱입니다. React Native로 크로스 플랫폼 개발했습니다.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    image: '/api/placeholder/800/500',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    color: 'from-orange-500/20 to-red-500/20',
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 전체 섹션의 진행도를 각 프로젝트별로 분할
  const projectProgress = projects.map((_, index) => {
    const start = index / projects.length
    const end = (index + 1) / projects.length
    return useTransform(scrollYProgress, [start, end], [0, 1])
  })

  return (
    <div ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      {projects.map((project, index) => {
        const progress = projectProgress[index]
        const y = useTransform(progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
        const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
        const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

        return (
          <motion.div
            key={project.id}
            style={{ y, opacity, scale }}
            className="sticky top-0 h-screen flex items-center justify-center px-6 py-20"
          >
            <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              {/* 프로젝트 이미지 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center">
                    <span className="text-white/40 text-lg">Project Preview</span>
                  </div>
                  
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-8 bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* 프로젝트 정보 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-white/60 text-sm">{project.year}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-xl text-white/80 mb-4">{project.subtitle}</p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* 기술 스택 */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 링크 버튼들 */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}