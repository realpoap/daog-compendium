import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/rules')({
  component: Rules,
})

function Rules() {
  return <div className="p-2">// Rules as text //</div>
}
