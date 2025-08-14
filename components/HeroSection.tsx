'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Three.js Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0.3,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    camera.position.z = 3

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      mesh.rotation.x += 0.001
      mesh.rotation.y += 0.002

      // Mouse interaction
      mesh.rotation.x += mouseY * 0.001
      mesh.rotation.y += mouseX * 0.001

      renderer.render(scene, camera)
    }

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const h1Ref = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const topEl = h1Ref.current
    const bottomEl = h2Ref.current
    const containerEl = containerRef.current
    if (!topEl || !bottomEl || !containerEl) return

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    type Measures = { startX: number; startY: number; deltaX: number; deltaY: number }
    let m1: Measures
    let m2: Measures

    const computeMeasures = () => {
      const rect1 = topEl.getBoundingClientRect()
      const rect2 = bottomEl.getBoundingClientRect()

      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2

      // Match initial CSS transforms in pixels
      const startX1 = 0.1 * rect1.width
      const startY1 = -1 * rect1.height
      const startX2 = -0.1 * rect2.width
      const startY2 = 1 * rect2.height

      const dx1 = viewportCenterX - (rect1.left + rect1.width / 2)
      const dy1 = viewportCenterY - (rect1.top + rect1.height / 2)
      const dx2 = viewportCenterX - (rect2.left + rect2.width / 2)
      const dy2 = viewportCenterY - (rect2.top + rect2.height / 2)

      m1 = { startX: startX1, startY: startY1, deltaX: dx1, deltaY: 0 }
      m2 = { startX: startX2, startY: startY2, deltaX: dx2, deltaY: 0 }
    }

    const apply = (t: number) => {
      // 3단계 애니메이션: 1) 중앙으로 모이기 2) 잠깐 유지 3) 위로 이동하며 사라지기
      let x1, y1, x2, y2, opacity
      
      if (t < 0.3) {
        // 1단계: 30%까지 중앙으로 모이기
        const moveT = t / 0.3
        x1 = lerp(m1.startX, m1.startX + m1.deltaX, moveT)
        y1 = m1.startY
        x2 = lerp(m2.startX, m2.startX + m2.deltaX, moveT)
        y2 = m2.startY
        opacity = 1
      } else if (t < 0.5) {
        // 2단계: 30%~50% 중앙에서 유지 (AboutMe와 겹치는 시간)
        x1 = m1.startX + m1.deltaX
        y1 = m1.startY
        x2 = m2.startX + m2.deltaX
        y2 = m2.startY
        opacity = 1
      } else {
        // 3단계: 50% 이후 위로 이동하며 사라지기
        const upwardT = (t - 0.5) / 0.5 // 0.5~1.0을 0~1로 매핑
        x1 = m1.startX + m1.deltaX
        y1 = m1.startY - (upwardT * 200) // 위로 200px 이동
        x2 = m2.startX + m2.deltaX
        y2 = m2.startY - (upwardT * 200) // 위로 200px 이동
        opacity = 1 - upwardT // 위로 이동하면서 서서히 사라짐
      }

      topEl.style.transform = `translate3d(${x1}px, ${y1}px, 0)`
      topEl.style.opacity = opacity.toString()
      bottomEl.style.transform = `translate3d(${x2}px, ${y2}px, 0)`
      bottomEl.style.opacity = opacity.toString()
    }

    const SPEED = 1.5 // 속도를 더 낮춰서 AboutMe와의 타이밍 맞춤

    const updateContainerHeight = () => {
      // Sticky duration = containerHeight - sectionHeight
      // We want sticky to end when t reaches 1, which occurs after window.innerHeight / SPEED scrolled
      // => containerHeight = sectionHeight + window.innerHeight / SPEED
      containerEl.style.height = `${window.innerHeight + window.innerHeight / SPEED}px`
    }

    const onScroll = () => {
      const rect = containerEl.getBoundingClientRect()
      // progress within the pinned container: 0 at container top, 1 after one viewport/SPEED scrolled
      const raw = (-rect.top / window.innerHeight) * SPEED
      const t = clamp(raw, 0, 1)
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          apply(t)
          ticking = false
        })
      }
    }

    const onResize = () => {
      updateContainerHeight()
      computeMeasures()
      onScroll()
    }

    computeMeasures()
    updateContainerHeight()
    apply(0)

    let ticking = false

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <section
        id="home"
        ref={sectionRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 text-center w-full">
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
            <div
              className="absolute left-0"
              style={{
                transform: 'translate(10%, -100%)',
              }}
              ref={h1Ref}
            >
              <h1>Frontend Developer</h1>
            </div>
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            <div
              className="absolute right-0"
              style={{
                transform: 'translate(-10%, 100%)',
              }}
              ref={h2Ref}
            >
              <h1>JUNG GYU CHEOL</h1>
            </div>
          </div>

          {/* <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            I believe web design can be more diverse and inspiring.
            <br />
            With a mission to present the possibilities of the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#works"
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              View Works
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              Contact Me
            </a>
          </motion.div> */}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div> */}
      </section>
    </div>
  )
}
