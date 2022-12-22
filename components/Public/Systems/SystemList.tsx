import { SystemsResponseI } from '@models/System.model'
import SystemCard from './SystemCard'

const SystemList = ({ systems }: { systems: SystemsResponseI }) => {
  return (
    <div>
      {systems && systems ? (
        systems.data.map((system) => (
          <div key={system.id}>
            <SystemCard system={system} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
export default SystemList
