import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bestiary/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bestiary/edit/$id"!</div>
}
