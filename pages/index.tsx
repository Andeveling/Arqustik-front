import Container from '@components/Container';
import CarouselGlass from '@components/IndexPageComponents/CarouselGlass';
import LoadingSpinner from '@components/LoadingSpinner';
import SystemList from '@components/Public/Systems/SystemList';
import { SystemsResponseI } from '@models/System.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import { GetStaticProps } from 'next';
import { Suspense } from 'react';

const { STRAPI_SERVER } = arqustikConfig;
const { systems } = endpoints;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${STRAPI_SERVER}${systems}`);
  const systems_pvc = await res.json();
  return {
    props: {
      systems_pvc,
    },
  };
};

export default function Home({ systems_pvc }: { systems_pvc: SystemsResponseI }) {
  return (
    <Suspense fallback={null}>
      <Container>
        <SystemList systems={systems_pvc} />
        <CarouselGlass />
      </Container>
    </Suspense>
  );
}
