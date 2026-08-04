import { motion } from "framer-motion";
import { FOLD_EASE, PAPER_EASE } from "./PaperAnimator";

const PAPER_FACE =
  "linear-gradient(165deg, #fbfbf8 0%, #f4f4ef 48%, #ebebe5 100%)";

/**
 * Letter-fold third. Uses % heights so panels meet with no seam gap.
 * Image is one continuous screenshot shifted — only used once folding starts.
 */
function FoldPanel({
  imageUrl,
  band,
  folded,
  folding,
  angle,
  origin,
}) {
  const topPct = band === "top" ? "0%" : band === "middle" ? "33.333%" : "66.666%";
  const imgTop =
    band === "top" ? "0%" : band === "middle" ? "-100%" : "-200%";

  return (
    <div
      className="absolute left-0 right-0"
      style={{
        top: topPct,
        height: "33.334%",
        transformStyle: "preserve-3d",
        zIndex: band === "middle" ? 1 : folding || folded ? 5 : 2,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformOrigin: origin,
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: folded || folding ? angle : 0 }}
        transition={{ duration: 0.82, ease: FOLD_EASE }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: "#f3f3f0",
          }}
        >
          <img
            src={imageUrl}
            alt=""
            draggable={false}
            className="pointer-events-none absolute left-0 w-full select-none"
            style={{
              top: imgTop,
              height: "300%",
              objectFit: "fill",
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: PAPER_FACE,
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "inset 0 0 24px rgba(18,18,18,0.045)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-35 noise mix-blend-multiply"
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Letter-fold of the floating screenshot.
 */
export default function PaperFold({ imageUrl, foldIndex, folded }) {
  if (!imageUrl) return null;

  const bottomFolding = foldIndex === 0 && !folded.includes(0);
  const bottomFolded = folded.includes(0);
  const topFolding = foldIndex === 1 && !folded.includes(1);
  const topFolded = folded.includes(1);

  return (
    <div
      className="relative w-full h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      <FoldPanel
        imageUrl={imageUrl}
        band="top"
        folded={topFolded}
        folding={topFolding}
        angle={178}
        origin="center bottom"
      />
      <FoldPanel
        imageUrl={imageUrl}
        band="middle"
        folded={false}
        folding={false}
        angle={0}
        origin="center center"
      />
      <FoldPanel
        imageUrl={imageUrl}
        band="bottom"
        folded={bottomFolded}
        folding={bottomFolding}
        angle={-178}
        origin="center top"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[10%] right-[10%] -bottom-2 h-3 rounded-full"
        style={{
          background: "rgba(18,18,18,0.2)",
          filter: "blur(7px)",
        }}
        initial={false}
        animate={{ opacity: bottomFolded || topFolded ? 0.5 : 0 }}
        transition={{ duration: 0.55, ease: PAPER_EASE }}
      />
    </div>
  );
}
