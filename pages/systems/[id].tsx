import Container from '@components/Container';
import Heading from '@components/Heading';
import CarouselGlass from '@components/IndexPageComponents/CarouselGlass';
import ModelsList from '@components/Public/Systems/models/ModelsList';
import { SystemResponseI, SystemsResponseI } from '@models/System.model';
import { WindowDoor } from '@models/WindowModels.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import { GetStaticPaths, GetStaticProps } from 'next';

const { STRAPI_SERVER } = arqustikConfig;
const { systems } = endpoints;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${STRAPI_SERVER}${systems}?populate=window_models`);
  const allSystems: SystemsResponseI = await response.json();
  const paths = allSystems.data.map((system) => ({ params: { id: String(system.id) } }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params);
  const id = Number(params?.id);
  const response = await fetch(`${STRAPI_SERVER}${systems}/${id}?populate=window_models`);
  // console.log(response);
  const system_pvc: SystemResponseI = await response.json();
  return { props: { system_pvc } };
};

const Systems = ({ system_pvc }: { system_pvc: SystemResponseI }) => {
  return (
    <Container>
      <CarouselGlass />

      <div className='mt-2'>
        <Heading as='h2'>Modelos disponibles</Heading>
      </div>

      <Heading as='h3'>Ventanas</Heading>
      {system_pvc && system_pvc.data.attributes.window_models.data && (
        <ModelsList
          models={system_pvc?.data.attributes.window_models.data.filter(
            (item) => item.attributes.windowdoor === WindowDoor.Window,
          )}
        />
      )}

      <div className='mt-10'>
        <Heading as='h3'>Puertas Ventanas</Heading>
      </div>

      {system_pvc && system_pvc.data.attributes.window_models.data && (
        <ModelsList
          models={system_pvc?.data.attributes.window_models.data.filter(
            (item) => item.attributes.windowdoor === WindowDoor.Door,
          )}
        />
      )}
    </Container>
  );
};
export default Systems;
