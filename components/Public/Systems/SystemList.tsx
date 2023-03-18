import { SystemsResponseI } from '@models/System.model';
import SystemCard from './SystemCard';

const SystemList = ({ systems }: { systems: SystemsResponseI }) => {
  return (
    <>{systems && systems ? systems.data.map((system) => <SystemCard key={system.id} system={system} />) : <></>}</>
  );
};
export default SystemList;
