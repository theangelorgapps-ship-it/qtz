import { createFileRoute } from '@tanstack/react-router'
import { EnterpriseContent } from '~/components/marketing/EnterpriseContent'

export const Route = createFileRoute('/enterprise')({
  component: EnterprisePage,
  head: () => ({ meta: [{ title: 'Enterprise | Upwork' }] }),
})

function EnterprisePage() {
  return <EnterpriseContent />
}
