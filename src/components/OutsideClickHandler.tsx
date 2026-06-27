import React, { useRef, useEffect, ReactNode } from "react";

interface OutsideClickHandlerProps {
  children: ReactNode;
  onOutsideClick?: () => void;
}

export default function OutsideClickHandler({
  children,
  onOutsideClick = () => {},
}: OutsideClickHandlerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
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
