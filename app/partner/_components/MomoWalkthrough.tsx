"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BatteryFull,
  Pause,
  Phone,
  Play,
  Signal,
  Wifi,
} from "lucide-react";

import { cn } from "cn";

const ussdCode = "*713*9040#";

const steps = [
  {
    title: "Dial the code",
    description: "Open your phone dialer and enter the MoMo shortcode.",
  },
  {
    title: "Choose an amount",
    description: "Select a suggested amount or enter a custom gift.",
    prompt: "Select your gift amount",
    options: [
      "GH₵ 5.00",
      "GH₵ 10.00",
      "GH₵ 50.00",
      "GH₵ 100.00",
      "GH₵ 500.00",
      "Enter custom amount",
    ],
    reply: "3",
  },
  {
    title: "Choose a frequency",
    description:
      "Give once or set a regular rhythm. You can cancel a subscription from this menu.",
    prompt: "How often would you like to give?",
    options: [
      "Weekly",
      "Monthly",
      "Annually",
      "One-time",
      "Cancel subscription",
    ],
    reply: "2",
  },
  {
    title: "Approve the payment",
    description:
      "Check the amount and approve the MoMo notification on your phone.",
    prompt: "Confirm your donation of GH₵50.00 to Jesus' Mission Fund.",
    reply: "••••",
  },
] as const;

const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export function MomoWalkthrough() {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(!reduceMotion);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setCurrent((step) => (step + 1) % steps.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [playing]);

  function goToStep(index: number) {
    setCurrent((index + steps.length) % steps.length);
    setPlaying(false);
  }

  const step = steps[current];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
          <span className="size-2 rounded-full bg-highlight" />
          Mobile money · step by step
        </p>
        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          Give in four simple steps.
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Follow the prompts on your phone. Your gift can be one-time or
          recurring.
        </p>

        <ol className="mt-8 space-y-1" aria-label="Giving steps">
          {steps.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                aria-current={current === index ? "step" : undefined}
                onClick={() => goToStep(index)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-[0.875rem] p-3 text-left transition-colors",
                  current === index ? "bg-accent" : "hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    current === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-brand-muted",
                  )}
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs leading-5 text-subtle-foreground">
          Dial <strong className="font-semibold text-brand">{ussdCode}</strong>{" "}
          to begin. The options shown on your provider’s menu may vary.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-140">
        <div
          aria-hidden="true"
          className="absolute -inset-8 rounded-[3rem] bg-linear-to-br from-accent via-background to-warning-muted blur-2xl"
        />
        <div
          aria-hidden="true"
          className="relative mx-auto w-75 rounded-[2.8rem] border-8 border-device-frame bg-device p-2 shadow-2xl shadow-foreground/40 sm:w-82.5"
        >
          <div className="relative h-140 overflow-hidden rounded-[2.15rem] bg-muted">
            <div className="relative z-20 flex h-10 items-center justify-between px-6 text-[10px] font-semibold text-foreground">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                <Signal className="size-3" />
                <Wifi className="size-3" />
                <BatteryFull className="size-3.5" />
              </span>
            </div>
            <div className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-device" />

            <Dialer dimmed={current > 0} />

            <div className="absolute inset-0 z-20 flex items-center px-5">
              <AnimatePresence mode="wait">
                {"prompt" in step && (
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <UssdDialog
                      prompt={step.prompt}
                      options={"options" in step ? step.options : undefined}
                      reply={step.reply}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-0 bottom-2 z-20 mx-auto h-1 w-24 rounded-full bg-inverse/35" />
          </div>
        </div>

        <div className="relative mx-auto mt-5 flex max-w-82.5 items-center justify-between">
          <button
            type="button"
            onClick={() => goToStep(current - 1)}
            aria-label="Previous step"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-brand transition hover:bg-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={
                playing ? "Pause automatic steps" : "Play automatic steps"
              }
              className="flex size-10 items-center justify-center rounded-full bg-secondary text-brand"
            >
              {playing ? (
                <Pause aria-hidden="true" className="size-4" />
              ) : (
                <Play aria-hidden="true" className="size-4" />
              )}
            </button>
            <span className="min-w-20 text-center text-xs font-semibold text-muted-foreground">
              {current + 1} / {steps.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => goToStep(current + 1)}
            aria-label="Next step"
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-hover"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Dialer({ dimmed }: { dimmed: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 top-10 flex flex-col px-6 pb-8 transition-opacity duration-300",
        dimmed && "opacity-30",
      )}
    >
      <p className="mt-10 text-center text-3xl font-light tracking-wide text-foreground">
        {ussdCode}
      </p>
      <div className="mt-auto grid grid-cols-3 gap-x-5 gap-y-3">
        {keypad.map((key) => (
          <span
            key={key}
            className="mx-auto flex size-14 items-center justify-center rounded-full bg-card text-xl text-foreground"
          >
            {key}
          </span>
        ))}
      </div>
      <span className="mx-auto mt-5 flex size-14 items-center justify-center rounded-full bg-momo text-inverse-foreground">
        <Phone className="size-5" />
      </span>
    </div>
  );
}

function UssdDialog({
  prompt,
  options,
  reply,
}: {
  prompt: string;
  options?: readonly string[];
  reply: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-5 text-foreground shadow-xl shadow-foreground/25">
      <p className="text-[13px] leading-5">{prompt}</p>
      {options && (
        <ol className="mt-2 space-y-0.5 text-[13px] leading-5">
          {options.map((option, index) => (
            <li key={option}>
              {index + 1}. {option}
            </li>
          ))}
        </ol>
      )}
      <p className="mt-4 border-b border-primary pb-1 text-sm">{reply}</p>
      <div className="mt-4 flex justify-end gap-6 text-xs font-semibold uppercase tracking-wide text-primary">
        <span>Cancel</span>
        <span>Send</span>
      </div>
    </div>
  );
}
