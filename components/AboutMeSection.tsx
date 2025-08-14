'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ABOUT_START,
  ABOUT_VISIBLE,
  ABOUT_FADE_IN_END,
  ABOUT_FADE_OUT_START,
  ABOUT_END,
} from '@/lib/scrollTimings'

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll()

  // 아래에서 위로 슬라이드업 효과 (Hero와 더 많이 겹치도록)
  const y = useTransform(
    scrollYProgress,
    [ABOUT_START, ABOUT_FADE_IN_END, ABOUT_FADE_OUT_START, ABOUT_END],
    [240, 0, 0, -260],
  )
  const opacity = useTransform(
    scrollYProgress,
    [ABOUT_START, ABOUT_VISIBLE, ABOUT_FADE_IN_END, ABOUT_FADE_OUT_START, ABOUT_END],
    [0, 0.35, 1, 1, 0],
  )
  const backdropOpacity = useTransform(
    scrollYProgress,
    [ABOUT_START, ABOUT_FADE_IN_END, ABOUT_FADE_OUT_START, ABOUT_END],
    [0.85, 0.85, 0.85, 0],
  )
  const scale = useTransform(
    scrollYProgress,
    [ABOUT_START, ABOUT_FADE_IN_END, ABOUT_FADE_OUT_START, ABOUT_END],
    [0.9, 1, 1, 0.98],
  )
  const rotateX = useTransform(
    scrollYProgress,
    [ABOUT_START, ABOUT_FADE_IN_END, ABOUT_FADE_OUT_START, ABOUT_END],
    [12, 0, 0, -3],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (boxRef.current) {
      observer.observe(boxRef.current)
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      style={{
        y,
        opacity,
        scale,
        rotateX,
      }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
    >
      {/* Backdrop to prevent seeing projects while AboutMe is visible */}
      <motion.div
        aria-hidden
        style={{ opacity: backdropOpacity }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div ref={boxRef} className="w-full max-w-4xl mx-auto px-6 pointer-events-auto">
        <motion.div
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Me
          </motion.h2>

          <motion.div
            className="space-y-4 text-white/80 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              안녕하세요! 저는 <span className="text-white font-semibold">정규철</span>입니다.
            </p>
            <p>
              사용자 경험을 최우선으로 생각하는{' '}
              <span className="text-blue-400">Frontend Developer</span>입니다.
            </p>
            <p>
              React, Next.js, TypeScript를 활용하여 모던하고 반응형 웹 애플리케이션을 개발하며,
              Three.js와 WebGL을 통해 인터랙티브한 웹 경험을 만들어냅니다.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { label: 'Experience', value: '5+ Years' },
              { label: 'Projects', value: '50+' },
              { label: 'Technologies', value: '15+' },
              { label: 'Coffee', value: '∞' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/5 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Node.js'].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  {skill}
                </span>
              ),
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
