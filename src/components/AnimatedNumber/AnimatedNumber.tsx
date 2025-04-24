import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className
}) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (numberRef.current) {
      const obj = { val: prevValueRef.current };
      gsap.to(obj, {
        val: value,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(obj.val).toString();
          }
        }
      });
      prevValueRef.current = value;
    }
  }, [value]);

  return <span ref={numberRef} className={className}>{value}</span>;
};