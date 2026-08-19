import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import {
  chipItem,
  fadeOnly,
  fadeUp,
  hasSeenIntro,
  heroContainer,
  heroItem,
  markIntroSeen,
  springSoft,
  springUi,
  staggerChips,
  staggerContainer,
  staggerFast,
  storyTitle,
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
  as: Tag = "div",
  ...props
}: HTMLMotionProps<"div"> & { fast?: boolean; chips?: boolean; as?: "div" | "ul" }) {
  const variants = chips ? staggerChips : fast ? staggerFast : staggerContainer;
  const Component = motion[Tag];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.08 }}
      variants={variants}
      {...props}
    >
      {children}
    </Component>
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
  const [skip] = useState(() => hasSeenIntro() || !!reduce);

  useEffect(() => {
    if (!hasSeenIntro()) markIntroSeen();
  }, []);

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
export function PageEnter({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const reduce = useReducedMotion();
  const Component = motion[Tag];
  return (
    <Component
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.18 } : springUi}
    >
      {children}
    </Component>
  );
}

/** Spoken section title, with a quiet category tag above. */
export function StoryHeading({
  children,
  tag,
  className,
}: {
  children: React.ReactNode;
  tag?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <header className={cn("story-head", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={reduce ? fadeOnly : storyTitle}
      >
        {tag ? <p className="story-tag">{tag}</p> : null}
        <h2 className="story-heading">{children}</h2>
      </motion.div>
    </header>
  );
}

/** One story beat — the in-view item stays sharp; neighbors recede. Opacity only. */
export function StoryEntry({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.1, margin: "0px 0px -12% 0px" });

  return (
    <motion.article
      ref={ref}
      className={cn("story-entry", className)}
      initial={false}
      animate={reduce ? { opacity: 1 } : { opacity: inView ? 1 : 0.65 }}
      transition={springSoft}
      style={{ transform: "none" }}
    >
      {children}
    </motion.article>
  );
}

export { tweenFast, springUi };
