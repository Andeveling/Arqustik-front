import Container from '@components/Container';
import Heading from '@components/Heading';
import LoadingSpinner from '@components/LoadingSpinner';
import SystemsList from '@components/systems/SystemsList';
import { usePublicAppStore } from 'context/PublicAppContext';

export default function Systems() {
  const { systems_pvc, error } = usePublicAppStore();
  const loading = !systems_pvc && !error;

  if (error)
    return (
      <Container>
        <p>Error {error.message} </p>
      </Container>
    );
  if (loading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  return (
    <Container title='Systems-PVC'>
      <div className='flex justify-between'>
        <Heading as='h3'>Sistemas PVC</Heading>
      </div>
      <SystemsList systems={systems_pvc} />
    </Container>
  );
}
