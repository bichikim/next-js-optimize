import {Counter} from '@/components/Counter'
import {OldWayCounter} from '@/components/OldWayCounter'
import {AlienCounter} from '@/components/AlienCounter'

export default function Home() {
  return <div>
    <Counter />
    <OldWayCounter />
    <AlienCounter />
  </div>;
}
