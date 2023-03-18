import Container from '@components/Container';
import CarouselGlass from '@components/IndexPageComponents/CarouselGlass';
import SystemList from '@components/Public/Systems/SystemList';
import { usePublicAppStore } from '@context/PublicAppContext';
import { Suspense } from 'react';

export default function Home() {
  const { systems_pvc, error } = usePublicAppStore();
  const loading = !systems_pvc && !error;
  return (
    <Suspense fallback={null}>
      <Container>
        <CarouselGlass />
        <h1 className='text-4xl font-bold '>Sistemas</h1>
        {systems_pvc && systems_pvc ? <SystemList systems={systems_pvc} /> : <></>}
      </Container>
    </Suspense>
  );
}
