import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import ParticlesComponent from './ParticlesComponent'
import Navbar from './Navbar'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export default function HeroSection() {
  return (
    <main className="overflow-hidden relative min-h-screen">
      <div aria-hidden className="absolute inset-0 isolate contain-strict ">
          <ParticlesComponent/>
      </div>
      <Navbar transparent />
      <section className="relative z-10 flex items-center justify-center min-h-screen px-6 text-center">
        <div className="w-full max-w-7xl">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="text-4xl text-white italic font-inter md:text-7xl xl:text-[5.25rem]"
          >
            Your Journey to Mental Well-being Starts Here
          </TextEffect>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            
          </AnimatedGroup>
        </div>
      </section>
    </main>
  )
}
