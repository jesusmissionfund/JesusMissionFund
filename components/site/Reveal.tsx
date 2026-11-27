"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const offsets = {
  up: { y: 20 },
  left: { x: -30 },
  right: { x: 30 },
};

export function Reveal({
  from = "up",
  delay = 0,
  immediate = false,
  ...props
}: Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  from?: keyof typeof offsets;
  delay?: number;
  immediate?: boolean;
}) {
  const hidden = { opacity: 0, ...offsets[from] };
  const shown = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      initial={hidden}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true } })}
      transition={{ duration: 0.6, delay }}
      {...props}
    />
  );
}
