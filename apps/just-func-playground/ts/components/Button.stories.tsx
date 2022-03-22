import Button from './Button'
export default {
  title: 'Inputs/Button',
  component: Button
}
export function NoIcon() {
  return (
    <div>
      <Button appearance='primary'>Primary</Button>
      <Button appearance='secondary'>Secondary</Button>
    </div>
  )
}
