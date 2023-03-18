import Container from '@components/Container';
import Heading from '@components/Heading';
import CartPrintFooter from '@components/Public/Summary/CartPrintFooter';
import CartPrintHeader from '@components/Public/Summary/CartPrintHeader';
import SummaryList from '@components/Public/Summary/SummaryList';
import SummaryModal from '@components/Public/Summary/SummaryModal';
import { useCart } from '@context/CartContext';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';

const CartPage = () => {
  const { items } = useCart();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Cotización-Arqustik`,
    onAfterPrint: () => {
      toast.success('Presupuesto generado correctamente.');
    },
  });

  return (
    <Container>
      <div ref={componentRef}>
        <div className='flex justify-between print:hidden'>
          <Heading as='h3'>Resumén</Heading>
          {/* <Button onClick={handlePrint}>Print</Button> */}
        </div>
        <CartPrintHeader />

        <SummaryList windows={items} />

        <hr />
        {items && items.length > 0 && (
          <div className='block mt-8 justify-between'>
            <SummaryModal handlePrint={handlePrint} windows={items} />
          </div>
        )}
        <CartPrintFooter />
      </div>
    </Container>
  );
};

export default CartPage;
