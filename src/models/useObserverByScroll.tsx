import { useEffect, RefObject } from 'react';

/**
 * 스크롤을 통해 페이지의 끝에 도달했을 때 다음 페이지를 불러오는 기능을 제공하는 커스텀 훅입니다.
 *
 * @param {Object} params - 함수의 매개변수를 담고 있는 객체입니다.
 * @param {boolean} params.isLoading - 현재 페이지 로딩 상태입니다. 로딩 중일 때는 다음 페이지를 불러오지 않습니다.
 * @param {RefObject<Element>} params.ref - 관찰할 DOM 요소의 current값 입니다. 이 요소가 뷰포트에 들어오면 다음 페이지를 불러옵니다.
 * @param {Function} params.fetchNextPage - 다음 페이지를 불러오는 함수입니다.
 * @returns {void}
 */
export const useObserverByScroll = ({
  isLoading,
  ref,
  fetchNextPage,
}: {
  isLoading: boolean;
  ref: any;
  fetchNextPage: () => void;
}) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver: IntersectionObserverCallback = (entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [isLoading, ref, fetchNextPage]);
};
