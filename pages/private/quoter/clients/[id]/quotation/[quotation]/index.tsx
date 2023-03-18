import QuotationHeader from '@components/Client/Quotation/QuotationHeader';
import Container from '@components/Container';
import Heading from '@components/Heading';
import ImportWindows from '@components/ImportWindows/ImportWindows';
import LoadingSpinner from '@components/LoadingSpinner';
import ModalR from '@components/ModalR';
import WindowsPVCForm, { ProjectDataProps } from '@components/WindowsPVC/WindowsPVCForm';
import WindowsPVCList from '@components/WindowsPVC/WindowsPVCList';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ProtectionEnum, QuotationResponseI, SiliconeEnum } from '@models/Quotation.model';
import { fetcher } from '@services/fetcher.service';
import { arqustikConfig, endpoints } from 'arqustik.config';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { PrivateRoutes } from 'routes';
import useSWR from 'swr';

const { quotations } = endpoints;
const { STRAPI_SERVER } = arqustikConfig;

export default function QuotationByClientID() {
  const { query } = useRouter();

  const {
    data: quotation,
    error,
    isValidating,
  } = useSWR<QuotationResponseI>(
    `${STRAPI_SERVER}${quotations}/${query.quotation}?populate=*&sort=createdAt:asc`,
    fetcher,
  );

  let projectData: ProjectDataProps = {
    installation: false,
    polyurethane: false,
    protection: ProtectionEnum.zero,
    transport: false,
    silicone: SiliconeEnum.zero,
  };

  if (error) return <Container>{<p>Algo salio mal</p>}</Container>;

  if (isValidating || !quotation)
    return (
      <Suspense fallback={null}>
        <Container>
          <LoadingSpinner />
        </Container>
      </Suspense>
    );

  if (quotation) {
    const {
      data: {
        attributes: { installation, polyurethane, silicone, transport, protection, windows, transport_mount },
      },
    } = quotation;

    projectData = {
      installation,
      polyurethane,
      silicone,
      transport,
      protection,
    };

    return (
      <Suspense fallback={null}>
        <Container>
          <div className='flex justify-between'>
            <Heading as='h2'>
              Cotización: <span className='font-light'>{`${quotation.data.attributes.project}`} </span>
            </Heading>
            <ModalR title='Ventana Nueva' form={<WindowsPVCForm projectData={projectData} />} />
          </div>
          <hr />

          <QuotationHeader info={quotation?.data.attributes} />

          <WindowsPVCList windows={windows.data} projectData={projectData} transport_mount={transport_mount ?? 0} />

          <div className='my-5 flex justify-between'>
            {windows.data.length > 0 && (
              <Button color='success' className='w-28 p-0'>
                <Link
                  className='flex  justify-center items-center w-full h-full'
                  href={`${PrivateRoutes.QUOTER_CLIENT}/${query.id}/quotation/${query.quotation}/pdf`}>
                  <DocumentTextIcon className='w-6 h-6' />
                  <span className='ml-2'>Resumén</span>
                </Link>
              </Button>
            )}
          </div>

          <ImportWindows projectData={projectData} />
        </Container>
      </Suspense>
    );
  }
}
