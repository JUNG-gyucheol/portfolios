'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: '현대적인 쇼핑몰 플랫폼',
    description: 'Next.js와 TypeScript로 구축한 반응형 이커머스 플랫폼',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    position: { x: -4, y: 2, z: 0 },
    color: 0x4f46e5, // indigo
  },
  {
    id: 2,
    title: 'Real-time Chat App',
    subtitle: '실시간 채팅 애플리케이션',
    description: 'Socket.io를 활용한 실시간 메시징 플랫폼',
    tags: ['React', 'Socket.io', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2024',
    position: { x: 4, y: 1, z: -2 },
    color: 0x059669, // emerald
  },
  {
    id: 3,
    title: 'AI Dashboard',
    subtitle: 'AI 기반 분석 대시보드',
    description: '머신러닝 모델을 활용한 데이터 분석 대시보드',
    tags: ['React', 'D3.js', 'Python'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    position: { x: 0, y: -1, z: 3 },
    color: 0x7c3aed, // violet
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    subtitle: '모바일 뱅킹 애플리케이션',
    description: '생체 인증과 보안 기능을 갖춘 모바일 뱅킹 앱',
    tags: ['React Native', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    year: '2023',
    position: { x: -2, y: -2, z: -1 },
    color: 0xdc2626, // red
  },
]

export default function Interactive3DPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const projectMeshes = useRef<THREE.Group[]>([])
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2())
  
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 10, 50)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 10)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Create project meshes
    projects.forEach((project, index) => {
      const group = new THREE.Group()
      
      // Main cube
      const geometry = new THREE.BoxGeometry(2, 1.5, 0.2)
      const material = new THREE.MeshPhongMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.8,
        emissive: project.color,
        emissiveIntensity: 0.1,
      })
      const cube = new THREE.Mesh(geometry, material)
      group.add(cube)

      // Frame
      const frameGeometry = new THREE.EdgesGeometry(geometry)
      const frameMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.5 
      })
      const frame = new THREE.LineSegments(frameGeometry, frameMaterial)
      group.add(frame)

      // Position
      group.position.set(
        project.position.x,
        project.position.y,
        project.position.z
      )

      // Add floating animation
      group.userData = { 
        originalY: project.position.y, 
        projectId: project.id,
        rotationSpeed: 0.005 + Math.random() * 0.01
      }

      scene.add(group)
      projectMeshes.current[index] = group
    })

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Camera rotation based on mouse position
      const targetRotationY = mouseRef.current.x * 0.5
      const targetRotationX = mouseRef.current.y * 0.3
      
      if (cameraRef.current) {
        cameraRef.current.rotation.y += (targetRotationY - cameraRef.current.rotation.y) * 0.05
        cameraRef.current.rotation.x += (targetRotationX - cameraRef.current.rotation.x) * 0.05
      }

      // Raycasting for hover detection
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
        const intersects = raycasterRef.current.intersectObjects(
          projectMeshes.current.map(group => group.children[0])
        )

        if (intersects.length > 0) {
          setIsHovering(true)
          const intersectedGroup = intersects[0].object.parent as THREE.Group
          const projectId = intersectedGroup.userData.projectId
          const project = projects.find(p => p.id === projectId)
          setSelectedProject(project || null)
        } else {
          setIsHovering(false)
          setSelectedProject(null)
        }
      }
    }

    const handleClick = () => {
      if (selectedProject && isHovering) {
        // Handle project click - could open modal or navigate
        console.log('Clicked project:', selectedProject.title)
      }
    }

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Animate project meshes
      projectMeshes.current.forEach((group, index) => {
        if (group.userData) {
          // Floating animation
          group.position.y = group.userData.originalY + Math.sin(Date.now() * 0.001 + index) * 0.3
          
          // Rotation animation
          group.rotation.x += group.userData.rotationSpeed
          group.rotation.y += group.userData.rotationSpeed * 0.5

          // Hover effect
          if (selectedProject && selectedProject.id === group.userData.projectId) {
            group.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
          } else {
            group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
          }
        }
      })

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [selectedProject, isHovering])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: sectionOpacity }}
      className="relative h-screen overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        style={{ cursor: isHovering ? 'pointer' : 'grab' }}
      />

      {/* Project Info Overlay */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-8 left-8 right-8 md:right-auto md:w-96 pointer-events-none"
        >
          <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60 text-sm">{selectedProject.year}</span>
              <div className="flex gap-2">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} className="text-white" />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors pointer-events-auto"
                >
                  <Github size={16} className="text-white" />
                </a>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-white/80 mb-3">{selectedProject.subtitle}</p>
            <p className="text-white/70 text-sm mb-4">{selectedProject.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-8 left-8 right-8 text-center pointer-events-none">
        <p className="text-white/60 text-sm">
          마우스를 움직여 3D 공간을 탐색하고 프로젝트를 클릭해보세요
        </p>
      </div>
    </motion.div>
  )
}