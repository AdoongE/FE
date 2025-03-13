import { useEffect } from 'react';

const ModalOutClick = (ref, onOutsideClick) => {
  useEffect(() => {
    if (!ref?.current) return;

    const handleClickOutside = (event) => {
      const dialogElement = ref.current;
      if (!dialogElement) return;

      const { left, right, top, bottom } =
        dialogElement.getBoundingClientRect();
      const clickedOutside =
        event.clientX < left ||
        event.clientX > right ||
        event.clientY < top ||
        event.clientY > bottom;

      if (clickedOutside) {
        onOutsideClick?.();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default ModalOutClick;
