import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const ModalF = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  return (
    <>
      <Button onClick={() => setOpenModal("default")}>Toggle modal</Button>
      <Modal show={openModal === "default"} onClose={() => setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this product?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
          <Button color='gray' onClick={() => setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalF;
