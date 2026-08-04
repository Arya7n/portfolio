import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getResumeDownloadController } from "./ResumeDownloadController";
import PaperLayer from "./PaperLayer";
import { PAPER_EASE } from "./PaperAnimator";
import { PAPER_PHASES } from "./FoldSequence";

/**
 * Overlay host.
 * While the screenshot is full-bleed, there is no dim — it replaces the page 1:1.
 * Dim only appears once the sheet lifts away.
 */
export default function PaperFoldOverlay() {
  const controller = getResumeDownloadController();
  const state = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot
  );

  useEffect(() => {
    return () => controller.destroy();
  }, [controller]);

  const show = state.active;
  const phase = state.phase;

  // Exact freeze — full-bleed screenshot, no dim, no motion
  const isFrozen = phase === PAPER_PHASES.PAUSE;

  const showDim =
    show &&
    !isFrozen &&
    phase !== PAPER_PHASES.SETTLE &&
    phase !== PAPER_PHASES.DONE;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="paper-fold-overlay"
          className="fixed inset-0 z-[9999]"
          style={{
            pointerEvents: "auto",
            perspective: 1800,
            perspectiveOrigin: "50% 42%",
            // Solid paper behind so nothing from body peeks through
            background: "#f3f3f0",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: PAPER_EASE }}
        >
          <motion.div
            className="absolute inset-0"
            aria-hidden
            initial={false}
            animate={{
              opacity: showDim ? 0.4 : 0,
            }}
            transition={{ duration: 0.35, ease: PAPER_EASE }}
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 42%, rgba(243,243,240,0.2), rgba(18,18,18,0.35))",
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <PaperLayer state={state} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
