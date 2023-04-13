import { SystemsResponseI } from '@models/System.model';
import SystemCard from './SystemCard';

const SystemList = ({ systems }: { systems: SystemsResponseI }) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {systems && systems ? systems.data.map((system) => <SystemCard key={system.id} system={system} />) : <></>}
    </div>
  );
};
export default SystemList;
