import { useEffect, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import {
  chipItem,
  fadeOnly,
  fadeUp,
  hasSeenIntro,
  heroContainer,
  heroItem,
  markIntroSeen,
  springUi,
  staggerChips,
  staggerContainer,
  staggerFast,
  tweenFast,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  fadeOnlyMode?: boolean;
};

/** In-view reveal. Reduced motion → opacity only. */
export function Reveal({ children, className, fadeOnlyMode = false, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const variants = reduce || fadeOnlyMode ? fadeOnly : fadeUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -6% 0px", amount: 0.1 }}
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
  chips = false,
  ...props
}: HTMLMotionProps<"div"> & { fast?: boolean; chips?: boolean }) {
  const variants = chips ? staggerChips : fast ? staggerFast : staggerContainer;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.08 }}
      variants={variants}
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
  chip = false,
  ...props
}: HTMLMotionProps<"div"> & {
  as?: "div" | "li" | "article" | "span";
  chip?: boolean;
}) {
  const reduce = useReducedMotion();
  const Component = motion[Tag];
  return (
    <Component
      className={className}
      variants={reduce ? fadeOnly : chip ? chipItem : fadeUp}
      {...props}
    >
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.18 } : springUi}
    >
      {children}
    </motion.div>
  );
}

/** Interactive card with press + hover lift (gated for fine pointers via CSS). */
export function MotionCard({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={springUi}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { tweenFast, springUi };
