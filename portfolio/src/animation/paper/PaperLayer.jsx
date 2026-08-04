import { motion } from "framer-motion";
import {
  FOLD_EASE,
  LAUNCH_EASE,
  PAPER_EASE,
  getA4Size,
  getLaunchTarget,
  getScreenshotSize,
} from "./PaperAnimator";
import { PAPER_PHASES } from "./FoldSequence";

/**
 * 1) Full-bleed screenshot = exact frozen screen (no overlap, no scale)
 * 2) Then lift as one sheet
 * 3) Curl into Resume.pdf → launch
 */
export default function PaperLayer({ state }) {
  const {
    phase,
    imageUrl,
    showTitle,
    showStamp,
    launching,
    viewportW,
    viewportH,
  } = state;

  if (!imageUrl) return null;

  const shot = getScreenshotSize(viewportW, viewportH);
  const a4 = getA4Size(viewportW, viewportH);
  const launch = getLaunchTarget(viewportW, viewportH);

  const isFrozen = phase === PAPER_PHASES.PAUSE;
  const isLift = phase === PAPER_PHASES.LIFT;
  const isHold = phase === PAPER_PHASES.HOLD;
  const isCurl = phase === PAPER_PHASES.CURL;
  const isDoc =
    phase === PAPER_PHASES.DOCUMENT ||
    phase === PAPER_PHASES.PRESENT ||
    phase === PAPER_PHASES.TILT ||
    phase === PAPER_PHASES.FLOAT ||
    phase === PAPER_PHASES.LAUNCH;
  const isTiltOrLater =
    phase === PAPER_PHASES.TILT ||
    phase === PAPER_PHASES.FLOAT ||
    phase === PAPER_PHASES.LAUNCH;
  const isFloatOrLater =
    phase === PAPER_PHASES.FLOAT || phase === PAPER_PHASES.LAUNCH;
  const isSettle = phase === PAPER_PHASES.SETTLE;

  // Frozen = exact viewport. Only after that do we shrink.
  let width = viewportW;
  let height = viewportH;
  if (isDoc || isCurl) {
    width = a4.width;
    height = a4.height;
  } else if (isLift || isHold) {
    width = shot.width;
    height = shot.height;
  }

  const isFloating = isLift || isHold || isCurl || isDoc;
  const showShot = !isDoc && !isSettle;

  return (
    <div
      className={
        isFrozen
          ? "absolute inset-0"
          : "absolute inset-0 flex items-center justify-center"
      }
    >
      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, width, height",
          borderRadius: isFloating && !isFrozen ? 6 : 0,
          background: "#f3f3f0",
          // Frozen: pin to viewport corners — identical to the real screen
          ...(isFrozen
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }
            : {}),
        }}
        initial={false}
        animate={
          isFrozen
            ? {
                x: 0,
                y: 0,
                scale: 1,
                rotateZ: 0,
                rotateX: 0,
                rotateY: 0,
                opacity: 1,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }
            : {
                width,
                height,
                x: launching ? launch.x : 0,
                y: launching
                  ? launch.y
                  : isFloatOrLater
                    ? -14
                    : isFloating
                      ? -8
                      : 0,
                scale: launching ? 0.28 : 1,
                rotateZ: launching ? 10 : isTiltOrLater ? 8 : isCurl ? 2 : 0,
                rotateX: launching
                  ? 6
                  : isTiltOrLater
                    ? 8
                    : isCurl
                      ? 12
                      : 0,
                rotateY: launching
                  ? -14
                  : isTiltOrLater
                    ? -10
                    : isCurl
                      ? -6
                      : 0,
                opacity: launching ? 0 : isSettle ? 0 : 1,
                boxShadow: isFloating
                  ? launching
                    ? "0 20px 40px rgba(18,18,18,0.14)"
                    : "0 40px 80px -20px rgba(18,18,18,0.3), 0 10px 24px rgba(18,18,18,0.08)"
                  : "0 0 0 rgba(0,0,0,0)",
              }
        }
        transition={
          launching
            ? {
                duration: 0.56,
                ease: LAUNCH_EASE,
                opacity: { duration: 0.42, delay: 0.12, ease: "easeIn" },
              }
            : {
                width: { duration: 0.9, ease: PAPER_EASE },
                height: { duration: 0.9, ease: PAPER_EASE },
                boxShadow: { duration: 0.7, ease: PAPER_EASE },
                opacity: { duration: 0.4, ease: PAPER_EASE },
                default: { duration: 0.75, ease: PAPER_EASE },
              }
        }
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{ overflow: "hidden" }}
        >
          {isFloating && !isSettle && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.7), inset 0 -1px 0 rgba(18,18,18,0.05)",
              }}
            />
          )}

          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: showShot ? (isCurl ? 0.35 : 1) : 0,
            }}
            transition={{ duration: 0.55, ease: PAPER_EASE }}
            style={{ pointerEvents: "none" }}
          >
            <img
              src={imageUrl}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none"
              style={{
                objectFit: "fill",
                display: "block",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{
              background:
                "linear-gradient(165deg, #fbfbf8 0%, #f4f4ef 50%, #ecece6 100%)",
            }}
            initial={false}
            animate={{ opacity: isDoc || isCurl ? (isCurl ? 0.7 : 1) : 0 }}
            transition={{ duration: 0.55, ease: PAPER_EASE }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 noise mix-blend-multiply"
            />
            <div
              aria-hidden
              className="absolute left-[14%] right-[14%] top-[22%] space-y-3 opacity-[0.12]"
            >
              <div className="h-px bg-ink" />
              <div className="h-px w-[72%] bg-ink" />
              <div className="h-px w-[88%] bg-ink" />
              <div className="h-px w-[64%] bg-ink mt-6" />
              <div className="h-px w-[80%] bg-ink" />
            </div>

            <motion.div
              className="relative z-10 flex flex-col items-center gap-3"
              initial={false}
              animate={{
                opacity: showTitle ? 1 : 0,
                y: showTitle ? 0 : 8,
              }}
              transition={{ duration: 0.5, ease: PAPER_EASE }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.24em] uppercase"
                style={{ color: "rgba(18,18,18,0.38)" }}
              >
                Document
              </p>
              <p
                className="font-display text-2xl md:text-[1.75rem] tracking-tight text-center"
                style={{ color: "#121212" }}
              >
                Resume.pdf
              </p>
              <motion.div
                className="mt-5 flex items-center gap-2 px-3 py-1.5"
                style={{
                  border: "1px solid rgba(27,77,62,0.32)",
                  color: "#1b4d3e",
                  borderRadius: 2,
                }}
                initial={false}
                animate={{
                  opacity: showStamp ? 1 : 0,
                  scale: showStamp ? 1 : 0.94,
                }}
                transition={{ duration: 0.45, ease: FOLD_EASE }}
              >
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]"
                  style={{ background: "#1b4d3e", color: "#f3f3f0" }}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
                  Ready
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scan removed — kept screenshot identical to the real screen */}
        </div>

        {isDoc && !isSettle && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-14 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: launching ? 0.1 : 0.55 }}
            transition={{ duration: 0.55, ease: PAPER_EASE }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(216,230,223,0.8) 0%, rgba(243,243,240,0) 70%)",
              filter: "blur(12px)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
