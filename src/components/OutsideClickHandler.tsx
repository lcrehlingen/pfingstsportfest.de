import React, { useRef, useEffect } from "react";

function OutsideClickHandler({ children, onOutsideClick = () => {} }: any) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
        wrapperRef.current
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideClickHandler;
