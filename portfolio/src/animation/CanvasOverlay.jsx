import { useEffect, useRef } from "react";
import { getAnimationController } from "./AnimationController";

/**
 * Full-screen canvas host for the resume download sequence.
 * Visibility is driven imperatively by AnimationController to avoid
 * a one-frame empty flash from React state updates.
 */
export default function CanvasOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rootEl =
      document.getElementById("portfolio-root") ||
      document.querySelector(".App");
    const controller = getAnimationController();

    controller.attach({
      canvas,
      rootEl,
    });

    const onResize = () => {
      if (!controller.isBusy) controller.resize();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      controller.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="resume-download-overlay"
      data-resume-overlay="true"
      aria-hidden="true"
      className="fixed inset-0 z-[9999]"
      style={{
        pointerEvents: "none",
        opacity: 0,
        touchAction: "none",
      }}
    />
  );
}
