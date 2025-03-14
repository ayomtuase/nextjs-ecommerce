import { cn } from "@/lib/utils";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

interface Props {
  filledStarIcon?: React.ReactNode;
  emptyStarIcon?: React.ReactNode;
  halfStarIcon?: React.ReactNode;
  value: number;
  emptyStarClassName?: string;
  halfStarClassName?: string;
  filledStarClassName?: string;

  starCount?: number;
  parentBoxClassName?: string;
  name: string;
}

const StarRatingComponent = ({
  filledStarIcon = <FaStar size={16} />,
  emptyStarIcon = <FaRegStar size={16} />,
  halfStarIcon = <FaRegStarHalfStroke size={16} />,
  starCount = 5,
  value,
  parentBoxClassName,
  filledStarClassName,
  emptyStarClassName,
  halfStarClassName,
  name,
}: Props) => {
  return (
    <p className={cn("flex space-x-1.5", parentBoxClassName)}>
      {Array.from({ length: starCount }).map((_, index) => {
        const isStarFilled = index + 1 <= value;
        const isHalfStar = index + 1 > value && index < value;

        if (isStarFilled) {
          return (
            <span
              key={`${name}-${index}`}
              className={cn("text-primary", filledStarClassName)}
            >
              {filledStarIcon}
            </span>
          );
        }

        if (isHalfStar) {
          return (
            <span
              key={`${name}-${index}`}
              className={cn("text-primary", halfStarClassName)}
            >
              {halfStarIcon}
            </span>
          );
        }
        return (
          <span
            key={`${name}-${index}`}
            className={cn("text-grey", emptyStarClassName)}
          >
            {emptyStarIcon}
          </span>
        );
      })}
    </p>
  );
};

export default StarRatingComponent;
