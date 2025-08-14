'use client'

import { motion } from 'framer-motion'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'] },
  {
    category: 'Design',
    items: ['UI/UX', 'Responsive Design', 'Animation', 'WebGL', 'Accessibility'],
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="space-y-4 text-white/70">
              <p>
                I'm a creative developer passionate about pushing the boundaries of web design and
                creating unique digital experiences. With a background in both design and
                development, I bridge the gap between aesthetics and functionality.
              </p>
              <p>
                My approach combines technical expertise with creative vision, focusing on building
                interactive, accessible, and performant web applications that inspire and engage
                users.
              </p>
              <p>
                I believe that the web should be a canvas for creativity and innovation, not just a
                platform for information. Every project is an opportunity to explore new
                possibilities and challenge conventional design patterns.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Skills & Technologies</h3>
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold text-white/40 mb-2">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-white/10 text-white/80 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
            <div className="text-white/40">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-white/40">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">30+</div>
            <div className="text-white/40">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-white/40">Awards Won</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
