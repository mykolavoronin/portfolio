import { useEffect, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import {
  fadeOnly,
  fadeUp,
  hasSeenIntro,
  heroContainer,
  heroItem,
  markIntroSeen,
  staggerContainer,
  staggerFast,
  tweenFast,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  fadeOnlyMode?: boolean;
};

/** In-view reveal. Content stays accessible; reduced motion → opacity only. */
export function Reveal({ children, className, fadeOnlyMode = false, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const variants = reduce || fadeOnlyMode ? fadeOnly : fadeUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -5% 0px", amount: 0.12 }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  fast = false,
  ...props
}: HTMLMotionProps<"div"> & { fast?: boolean }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.1 }}
      variants={fast ? staggerFast : staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "li" | "article" | "span" }) {
  const reduce = useReducedMotion();
  const Component = motion[Tag];
  return (
    <Component className={className} variants={reduce ? fadeOnly : fadeUp} {...props}>
      {children}
    </Component>
  );
}

/** Hero orchestrated entrance — once per session. */
export function HeroIntro({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const seen = hasSeenIntro();
    setSkip(seen || !!reduce);
    if (!seen) markIntroSeen();
  }, [reduce]);

  if (skip || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={heroContainer}>
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "p" | "header";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const Component = motion[Tag === "header" ? "div" : Tag];
  return (
    <Component className={className} variants={heroItem}>
      {children}
    </Component>
  );
}

/** Route-level enter — soft, fast, no bounce. */
export function PageEnter({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.2 } : tweenFast}
    >
      {children}
    </motion.div>
  );
}
