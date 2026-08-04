import { useCallback } from "react";
import { getResumeDownloadController } from "@/animation/paper/ResumeDownloadController";
import { profile } from "@/data/content";

/**
 * Hook for triggering the paper-fold resume download sequence.
 */
export function useResumeAnimation() {
  const start = useCallback((options = {}) => {
    const controller = getResumeDownloadController();
    if (controller.isBusy) return Promise.resolve();
    return controller.start({
      resumeUrl: options.resumeUrl ?? profile.links.resume,
    });
  }, []);

  return { startResumeAnimation: start, isBusy: () => getResumeDownloadController().isBusy };
}

export default useResumeAnimation;
