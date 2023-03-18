import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='es'>
      <Head />
      <body className='bg-gray-100 dark:bg-gray-800 text-gray-800  dark:text-gray-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
