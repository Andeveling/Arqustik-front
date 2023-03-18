import Head from 'next/head';
import React, { ReactNode, Suspense } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Container(props: { [x: string]: any; children: ReactNode }) {
  const { children, ...customMeta } = props;
  const meta = {
    title: 'Arqustik PVC Quoter',
    description: `Empresa dedicada a la fabricación de ventanas y puertaventanas en PVC`,
    keyWords: 'Arqustik, deceuninck, colombia, ventanas, puertas, pvc, instalación',
    type: 'website',
    ...customMeta,
  };

  return (
    <Suspense fallback={null}>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta name='description' content={meta.description} />
        <meta name='keywords' content={meta.keyWords} />
      </Head>
      <Header />
      <main className='bg-gradient-to-b from-gray-200 dark:from-black'>
        <div className='mx-auto max-w-7xl py-4 sm:px-6 lg:px-8 min-h-screen'>
          <div className='px-4 py-1 sm:px-0'>{children}</div>
        </div>
      </main>
      <Footer />
    </Suspense>
  );
}

/* 
  <div className='h-96 rounded-lg border-4 border-dashed border-gray-200'>
*/
