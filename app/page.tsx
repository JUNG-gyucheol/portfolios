import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutMeSection from '@/components/AboutMeSection'
import ProjectsGridSection from '@/components/ProjectsGridSection'
import WorksSection from '@/components/WorksSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* <Navigation /> */}
      <main className="relative">
        <HeroSection />
        <AboutMeSection />
        {/* AboutMe와 프로젝트 사이 여백 증가 */}
        <div className="h-24 md:h-40"></div>
        <ProjectsGridSection />
        {/* <WorksSection />
        <AboutSection />
        <ContactSection /> */}
        {/* 추가 스크롤 공간 증가 */}
        <div className="h-[200vh]"></div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
