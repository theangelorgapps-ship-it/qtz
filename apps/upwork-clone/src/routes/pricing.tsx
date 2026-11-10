import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FeatureComparison } from '~/components/marketing/FeatureComparison'
import { FreelancerPanel } from '~/components/marketing/FreelancerPanel'
import { PlanCards } from '~/components/marketing/PlanCards'
import { PricingHero } from '~/components/marketing/PricingHero'
import type { PricingTab } from '~/components/marketing/PricingHero'
import { TrustedTalent } from '~/components/marketing/TrustedTalent'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => ({ meta: [{ title: 'Pricing | Upwork' }] }),
})

function PricingPage() {
  const [tab, setTab] = useState<PricingTab>('clients')

  return (
    <>
      <PricingHero tab={tab} onTab={setTab} />
      {tab === 'clients' ? (
        <>
          <PlanCards />
          <FeatureComparison />
          <TrustedTalent />
        </>
      ) : (
        <FreelancerPanel />
      )}
    </>
  )
}
