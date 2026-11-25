"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Pause, Phone, Play, Signal, Wifi, BatteryFull } from "lucide-react";

const steps = [
  { eyebrow: "Step 1 of 4", title: "Dial the code", description: "Open your phone dialer and enter the MoMo shortcode.", screenTitle: "Mobile Money", helper: "Enter service code", type: "dial" },
  { eyebrow: "Step 2 of 4", title: "Choose an amount", description: "Select a suggested amount or enter a custom gift.", screenTitle: "Choose amount", helper: "Select your gift amount", type: "amount" },
  { eyebrow: "Step 3 of 4", title: "Choose a frequency", description: "Give once or set a regular rhythm. You can cancel a subscription from this menu.", screenTitle: "Giving frequency", helper: "How often would you like to give?", type: "frequency" },
  { eyebrow: "Step 4 of 4", title: "Approve the payment", description: "Check the amount and approve the MoMo notification on your phone.", screenTitle: "Confirm payment", helper: "Approve the prompt sent to your phone", type: "approve" },
] as const;

export default function MomoWalkthrough() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setCurrent((step) => (step + 1) % steps.length), 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const step = steps[current];

  function goToStep(index: number) {
    setCurrent((index + steps.length) % steps.length);
    setPlaying(false);
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-muted"><span className="h-2 w-2 rounded-full bg-highlight" />Mobile money · step by step</div>
        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">Give in four simple steps.</h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Follow the prompts on your phone. Your gift can be one-time or recurring.</p>

        <div className="mt-8 space-y-1" aria-label="Giving steps">
          {steps.map((item, index) => (
            <button key={item.eyebrow} type="button" aria-current={current === index ? "step" : undefined} onClick={() => goToStep(index)} className={`group flex w-full items-start gap-4 rounded-[0.875rem] p-3 text-left transition-colors ${current === index ? "bg-accent" : "hover:bg-muted"}`}>
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${current === index ? "bg-primary text-primary-foreground" : "bg-secondary text-brand-muted"}`}>{index + 1}</span>
              <span><span className="block text-sm font-semibold text-foreground">{item.title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span></span>
            </button>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-subtle-foreground">Dial <strong className="font-semibold text-brand">*713*9040#</strong> to begin. The options shown on your provider’s menu may vary.</p>
      </div>

      <div className="relative mx-auto w-full max-w-[560px]">
        <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-accent via-background to-warning-muted blur-2xl" />
        <div className="relative mx-auto w-[min(100%,330px)] rounded-[2.8rem] border-[8px] border-[#1b211e] bg-[#111714] p-2 shadow-[0_28px_70px_-28px_rgba(25,45,31,0.55)] sm:w-[350px]">
          <div className="relative overflow-hidden rounded-[2.15rem] bg-muted">
            <div className="flex h-10 items-center justify-between px-5 text-[10px] font-semibold text-foreground"><span>9:41</span><span className="flex items-center gap-1.5"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-3.5 w-3.5" /></span></div>
            <div className="mx-auto -mt-9 h-6 w-28 rounded-full bg-[#111714]" />
            <div className="min-h-[430px] px-5 pb-5 pt-5 sm:min-h-[452px]">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span className="flex h-7 w-7 items-center justify-center rounded-[0.625rem] bg-secondary text-primary"><Phone className="h-3.5 w-3.5" /></span>JMF · Mobile Money</div>
              <div className="mt-5 rounded-[1rem] bg-primary px-4 py-4 text-primary-foreground"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-inverse-foreground/65">{step.eyebrow}</p><AnimatePresence mode="wait"><motion.div key={current} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.25 }}><h4 className="mt-2 text-lg font-semibold">{step.screenTitle}</h4><p className="mt-1 text-xs leading-5 text-inverse-foreground/75">{step.helper}</p></motion.div></AnimatePresence></div>
              <AnimatePresence mode="wait">
                <motion.div key={step.type} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }} className="mt-4">
                  {step.type === "dial" && <div className="rounded-[1rem] border border-border bg-card p-4"><p className="text-[10px] font-medium text-muted-foreground">USSD service code</p><p className="mt-2 text-center text-2xl font-bold tracking-wide text-primary">*713*9040#</p><div className="mt-4 grid grid-cols-3 gap-2">{["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((number) => <span key={number} className="flex h-8 items-center justify-center rounded-[0.625rem] bg-muted text-xs font-semibold text-foreground/85">{number}</span>)}</div><div className="mt-3 flex items-center justify-center gap-2 rounded-[0.875rem] bg-[#198754] py-2.5 text-xs font-semibold text-inverse-foreground"><Phone className="h-3.5 w-3.5" /> Call</div></div>}
                  {step.type === "amount" && <div className="space-y-2 rounded-[1rem] border border-border bg-card p-4"><p className="mb-3 text-[10px] text-muted-foreground">Select your preferred amount</p>{["GH₵ 5.00", "GH₵ 10.00", "GH₵ 50.00", "GH₵ 100.00", "GH₵ 500.00", "Enter custom amount"].map((amount, index) => <div key={amount} className={`flex items-center justify-between rounded-[0.875rem] border px-3 py-2.5 text-xs ${index === 2 ? "border-primary bg-accent font-semibold text-primary" : "border-border text-foreground/85"}`}><span>{index + 1}. {amount}</span>{index === 2 && <Check className="h-3.5 w-3.5" />}</div>)}</div>}
                  {step.type === "frequency" && <div className="space-y-2 rounded-[1rem] border border-border bg-card p-4"><p className="mb-3 text-[10px] text-muted-foreground">Choose a giving frequency</p>{["Weekly", "Monthly", "Annually", "One-time", "Cancel subscription"].map((frequency, index) => <div key={frequency} className={`flex items-center justify-between rounded-[0.875rem] border px-3 py-3 text-xs ${index === 1 ? "border-primary bg-accent font-semibold text-primary" : "border-border text-foreground/85"}`}><span>{index + 1}. {frequency}</span>{index === 1 && <Check className="h-3.5 w-3.5" />}</div>)}</div>}
                  {step.type === "approve" && <div className="rounded-[1rem] border border-border bg-card p-4"><p className="text-[10px] font-medium text-muted-foreground">Payment request</p><div className="mt-3 flex items-start gap-3 rounded-[0.875rem] bg-accent p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Phone className="h-4 w-4" /></span><div><p className="text-xs font-semibold text-foreground">Mobile Money</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">Confirm your donation of GH₵50.00 to Jesus&apos; Mission Fund.</p></div></div><div className="mt-4 rounded-[0.875rem] bg-primary py-3 text-center text-xs font-semibold text-primary-foreground">Approve payment</div><p className="mt-3 text-center text-[10px] text-subtle-foreground">You’ll receive a confirmation after approval.</p></div>}
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">{steps.map((item, index) => <span key={item.eyebrow} className={`h-1.5 rounded-full transition-all ${current === index ? "w-6 bg-primary" : "w-1.5 bg-input"}`} />)}</div>
            </div>
            <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-inverse/35" />
          </div>
        </div>
        <div className="relative mx-auto mt-5 flex max-w-[350px] items-center justify-between">
          <button type="button" onClick={() => goToStep(current - 1)} aria-label="Previous step" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-brand transition hover:bg-accent"><ArrowLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-3"><button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause automatic steps" : "Play automatic steps"} className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-brand">{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button><span className="min-w-20 text-center text-xs font-semibold text-muted-foreground">{current + 1} / {steps.length}</span></div>
          <button type="button" onClick={() => goToStep(current + 1)} aria-label="Next step" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-hover"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
