import { createFileRoute } from '@tanstack/react-router'
import { AiQuiz } from '~/components/home/AiQuiz'
import { Categories } from '~/components/home/Categories'
import { CtaBanner } from '~/components/home/CtaBanner'
import { G2Badges } from '~/components/home/G2Badges'
import { Hero } from '~/components/home/Hero'
import { HowItWorks } from '~/components/home/HowItWorks'
import { Plans } from '~/components/home/Plans'
import { PricingInsights } from '~/components/home/PricingInsights'
import { PromoBanner } from '~/components/home/PromoBanner'
import { Testimonials } from '~/components/home/Testimonials'
import { TrustedBy } from '~/components/home/TrustedBy'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <PromoBanner />
      <Hero />
      <TrustedBy />
      <Categories />
      <AiQuiz />
      <HowItWorks />
      <PricingInsights />
      <Plans />
      <Testimonials />
      <G2Badges />
      <CtaBanner />
    </>
  )
}
