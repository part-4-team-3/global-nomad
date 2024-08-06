import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface DaumPostcodeData {
  address: string;
  autoJibunAddress: string;
  autoRoadAddress: string;
  bname: string;
  buildingName: string;
  apartment: string;
  jibunAddress: string;
  roadAddress: string;
  userSelectedType: string;
  zonecode: string;
}

interface Props {
  value?: string;
  onChange: (address: string) => void;
}

export default function AddressInput({ value, onChange }: Props) {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    const fullAddress = ` ${address} ${extraAddress} ${detailAddress}`.trim();
    onChange(fullAddress);
  }, [address, extraAddress, detailAddress, onChange]);

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        // 주소 변수
        let addr = '';
        let extraAddr = '';

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 도로명 주소 선택
          addr = data.roadAddress;
        } else {
          // 지번 주소 선택
          addr = data.jibunAddress;
        }

        // 도로명 주소일 경우 참고항목을 조합
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setExtraAddress(extraAddr);
        onChange(addr);
      },
    }).open();
  };

  const handleDetailAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex gap-[8px] md:gap-[12px]">
        <input
          className="grow rounded-md border border-var-gray2 px-20pxr py-16pxr"
          type="text"
          id="sample6_postcode"
          placeholder="우편번호"
          value={postcode}
          readOnly
        />
        <Button
          text="우편번호 찾기"
          size="s"
          type="button"
          onClick={openPostcodePopup}
          color="black"
        />
      </div>
      <Input
        size="full"
        type="text"
        id="sample6_address"
        placeholder="주소"
        value={address}
        readOnly
      />
      <div className="flex gap-[12px]">
        <Input
          size="formField"
          type="text"
          id="sample6_extraAddress"
          placeholder="참고항목"
          value={extraAddress}
          readOnly
        />
        <Input
          size="formField"
          type="text"
          id="sample6_detailAddress"
          placeholder="상세주소"
          value={detailAddress}
          onChange={handleDetailAddressChange}
          readOnly={!postcode || !address}
          maxLength={10}
        />
      </div>
    </div>
  );
}
