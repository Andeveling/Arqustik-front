import { QuotationResponseI } from "@models/Quotation.model";
import { WindowsDatum } from "@models/WindowPVC.model";
import QuotationFooter from "./QuotationFooter";
import WindowPDFDetailsCard from "./WindowPDFDetailsCard";

const QuotationBodyPDF = ({
  windows,
  quotation,
  transport_mount,
}: {
  windows: WindowsDatum[]
  quotation: QuotationResponseI
  transport_mount: number
}) => {
  let total = 0;

  const getTotal = ({ windows }: { windows: WindowsDatum[] }) => {
    total = windows.reduce((acc, window) => {
      return acc + window.attributes.price * window.attributes.cant;
    }, 0);
  };
  if (windows) getTotal({ windows });

  return (
    <>
      <div className='border-b'>
        {windows && windows.length > 0 ? (
          windows.map((window) => (
            <div key={window.id}>
              <WindowPDFDetailsCard window={window} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <QuotationFooter quotation={quotation} total={total} transport_mount={transport_mount} />
    </>
  );
};
export default QuotationBodyPDF;
