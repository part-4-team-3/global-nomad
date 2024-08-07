'use client';
import AddressLabel from '@/components/atoms/address-label/AddressLabel';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  address: string;
}

export default function Map({ address }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

      const imageSrc = '/marker.svg'; // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          if (result[0].road_address.building_name !== '') {
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: coords,
              content: `<div style="position:relative;top:-90px;left:3px;text-align:center;padding:6px 15px; background-color: white; border: 2px solid #00825c; border-radius: 10px;">${result[0].road_address.building_name}</div>`,
            });
            customOverlay.setMap(map);
          }

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  }, [address]);

  return (
    <section id="map">
      <div className="flex w-full max-w-450pxr flex-col gap-[8px] py-[16px] md:max-w-full md:border-t md:border-var-gray4 md:py-[40px]">
        <div className="z-0 h-450pxr w-full" ref={mapRef}></div>
        <AddressLabel address={address} />
      </div>
    </section>
  );
}
