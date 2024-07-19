import Image from 'next/image';
import Modal from './Modal';
import Button from '@/components/atoms/button/Button';
import { useModal } from '@/store/useModal';
import { useMutation } from '@tanstack/react-query';
import { reviewReservationMutationOptions } from './../../../mutations/my-reservations/review';
import StarRating from '../star-rating/starRating';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CardImage from '@/components/atoms/card-image/CardImage';

interface Props {
  id: number;
  src: string;
  title: string;
  date: string;
  price: number;
}

interface FormData {
  rating: number;
  content: string;
}

export default function EditReviewModal({ id, src, title, date, price }: Props) {
  const { setIsClose } = useModal();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      rating: 1,
      content: '',
    },
  });

  const closeModal = () => {
    setIsClose();
  };

  const mutation = useMutation(reviewReservationMutationOptions);

  const onSubmit = (data: FormData) => {
    mutation.mutate(
      { reservationId: id, ...data },
      {
        onSuccess: () => {
          toast('후기가 작성되었습니다.');
          closeModal();
        },
      },
    );
  };

  return (
    <Modal modalKey={`editReviewModal-${id}`}>
      <div className="h-777pxr w-375pxr px-[24px] pb-[46px] pt-[28px] md:h-750pxr md:w-480pxr">
        <div className="mb-[41px] flex items-center justify-between">
          <h1 className="text-28pxr font-bold">후기 작성</h1>{' '}
          <button onClick={closeModal}>
            <Image src="/close.svg" width={40} height={40} alt="close modal" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-24pxr">
          <div className="flex gap-8pxr md:gap-24pxr">
            <CardImage variant="modal" src={src} />
            <div className="flex flex-col gap-12pxr">
              <div className="text-20pxr font-bold">{title}</div>
              <div className="text-18pxr">{date}</div>
              <div className="border-t border-gray-300"></div>
              <span className="text-32pxr font-bold">{`₩${price.toLocaleString('ko-KR')}`}</span>
            </div>
          </div>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex h-100pxr items-center justify-center">
                <StarRating {...field} />
              </div>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="후기를 작성해주세요"
                className="h-346pxr w-343pxr resize-none rounded border border-var-gray2 px-[16px] py-[8px] outline-none md:h-240pxr md:w-432pxr"
              />
            )}
          />
          <Button
            type="submit"
            className="h-48pxr w-full md:h-56pxr"
            text="작성하기"
            color="black"
          />
        </form>
      </div>
    </Modal>
  );
}
