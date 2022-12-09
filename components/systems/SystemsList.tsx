import { SystemsResponseI } from "@models/System.model"

import SystemCard from "./SystemCard"

const SystemsList = ({ systems }: { systems: SystemsResponseI }) => {
  return (
    <div>
      {systems && systems.data.length ? (
        systems.data.map((system) => (
          <div key={system.id}>
            <SystemCard system={system} />
          </div>
        ))
      ) : (
        <p>No hay sistemas</p>
      )}
    </div>
  )
}
export default SystemsList
