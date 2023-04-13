import { SystemResponseI, SystemsEnum } from '@models/System.model';
import Image from 'next/image';
import Link from 'next/link';

const SystemCard = ({ system }: { system: SystemResponseI['data'] }) => {
  return (
    <Link href={`systems/${system.id}`} className='bg-black cols'>
      <article className='mx-auto max-w-md  shadow-xl bg-cover pb-3 bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group relative'>
        <Image
          loading='lazy'
          width={700}
          height={475}
          src={`/img/${system.attributes.title}.jpg`}
          alt={system.attributes.title}
          className='absolute top-0 left-0 bottom-0 right-0'
        />

        <div className=' bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300'>
          <h1 className='text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'>
            {convertName(system.attributes.title)}
          </h1>
          <div className='w-16 h-2 bg-orange-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'></div>
          <p className='opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500'>
            {system.attributes.description.slice(0, 100)}
          </p>
        </div>
      </article>
    </Link>
  );
};
export default SystemCard;

const convertName = (name: SystemsEnum) => {
  const systems = {
    [SystemsEnum.BellaSliding]: 'Correderas / Deslizantes',
    [SystemsEnum.EverestMax]: 'Batientes, Proyectantes, Oscilobatientes',
  };
  return systems[name];
};
