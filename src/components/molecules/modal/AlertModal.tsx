import Modal from './Modal';
import Button from '@/components/atoms/button/Button';
import { useRouter } from 'next/navigation';
import { useModal } from '@/store/useModal';

interface Props {
  text: string;
}

export default function AlertModal({ text }: Props) {
  const { setIsClose } = useModal();
  const router = useRouter();

  const closeModal = () => {
    setIsClose();
    router.push('/myactivity');
  };

  return (
    <Modal modalKey="alertMessage">
      <div className="relative flex flex-col items-center justify-center gap-[48px] px-[65px] py-[28px] pt-[80px] md:px-[172px] md:pb-[121px] md:pt-[108px]">
        <div className="text-center font-[Pretendard] text-[18px] font-medium not-italic text-var-primary">
          {text}
        </div>
        <div className="bottom-[28px] right-[28px] md:absolute">
          <Button size="m" color="black" text="확인" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
