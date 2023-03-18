import { CreateClientSchema } from '@components/Client/ClientSchema';
import SubmitInput from '@components/SubmitInput';
import { useCart } from '@context/CartContext';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowDownTrayIcon, PrinterIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { CartItemI } from '@models/CartItem.model';
import { InterestedI } from '@models/Interested.model';
import { interestedPVC } from '@services/interested.service';
import { currencyFormatter } from '@utils/currencyFormatter';
import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TotalsI {
  subTotal: string | number
  iva: string | number
  total: string | number
}

const SummaryModal = ({ handlePrint, windows }: { handlePrint: () => void; windows: CartItemI[] }) => {
  const {
    subTotal,
    handleShowPrice: { showPrice, setShowPrice },
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [totals, setTotals] = useState<TotalsI>({
    subTotal: '',
    iva: '',
    total: '',
  });

  useEffect(() => {
    setTotals({
      subTotal: currencyFormatter(subTotal),
      iva: currencyFormatter(subTotal * 0.19),
      total: currencyFormatter(subTotal * 1.19),
    });
  }, [subTotal]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InterestedI>({
    resolver: yupResolver(CreateClientSchema),
  });
  const onSubmit: SubmitHandler<InterestedI> = async (data: {
    fullName: string
    cellphone: string
    email: string
    address: string
  }) => {
    setIsLoading(true);
    await axios.post(`/api/mail`, { ...data, ...totals }).catch((err: any) => console.log(err));
    toast.promise(
      interestedPVC
        .create({
          data: {
            fullName: data.fullName,
            cellphone: data.cellphone,
            email: data.email,
            address: data.address,
            windows: JSON.stringify(windows),
          },
        })
        .then(() => {
          closeModal();
          setShowPrice(true);
          reset();
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false))
        .catch((err) => console.error(err)),
      {
        loading: 'Creando...',
        success: <b>¡Cotización creada!</b>,
        error: <b>No se pudo crear la cotización</b>,
      },
    );
  };

  return (
    <div>
      {showPrice && (
        <div>
          <div className='flex justify-between '>
            <p>Subtotal:</p>
            <span>{currencyFormatter(subTotal)}</span>
          </div>
          <div className='flex justify-between'>
            <p>IVA 19%:</p>
            <span>{currencyFormatter(subTotal * 0.19)}</span>
          </div>
          <div className='flex justify-between'>
            <p>Total:</p>
            <span>{currencyFormatter(subTotal * 1.19)}</span>
          </div>
        </div>
      )}
      <div className='flex justify-end mt-4'>
        {!showPrice ? (
          <Button className='print:hidden' color='dark' onClick={openModal}>
            <ArrowDownTrayIcon className='w-5 h-5 mr-2' />
            Descargar Cotizacíon
          </Button>
        ) : (
          <Button color='dark' className='print:hidden' onClick={handlePrint}>
            <PrinterIcon className='w-5 h-5 mr-2' />
            Imprimir
          </Button>
        )}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-black p-6 text-left align-middle shadow-xl transition-all'>
                    <div className='mt-4 flex justify-end'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}>
                        <XMarkIcon className='h-8 w-8 font-bold' />
                      </button>
                    </div>
                    <Dialog.Title as='h2' className='text-center font-medium  text-gray-900 dark:text-gray-50'>
                      Cotizacíon
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-4'>
                        <Label htmlFor='fullName'>Nombre y apellidos</Label>
                        <TextInput type='text' id='fullName' {...register('fullName')} />
                        <p className='pt-1 text-xs text-red-500'>{errors.fullName?.message}</p>
                      </div>

                      <div className='mb-4'>
                        <Label htmlFor='cellphone'>Celular</Label>
                        <TextInput type='text' id='cellphone' {...register('cellphone')} />
                        <p className='pt-1 text-xs text-red-500'>{errors.cellphone?.message}</p>
                      </div>
                      <div className='mb-4'>
                        <Label htmlFor='fullName'>Dirección</Label>
                        <TextInput type='text' id='fullName' {...register('address')} />
                        <p className='pt-1 text-xs text-red-500'>{errors.address?.message}</p>
                      </div>
                      <div className='mb-4'>
                        <Label htmlFor='email'>Email</Label>
                        <TextInput type='email' id='email' {...register('email')} />
                        <p className='pt-1 text-xs text-red-500'>{errors.email?.message}</p>
                      </div>

                      <SubmitInput value='Descargar' isLoading={isLoading} />
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};
export default SummaryModal;
