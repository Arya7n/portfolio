import { getResumeDownloadController } from "./paper/ResumeDownloadController";
import { profile } from "@/data/content";

/**
 * Public entry — paper-fold resume download sequence.
 * @param {{ resumeUrl?: string }} [options]
 * @returns {Promise<void>}
 */
export function startResumeAnimation(options = {}) {
  const controller = getResumeDownloadController();
  if (controller.isBusy) return Promise.resolve();

  return controller.start({
    resumeUrl: options.resumeUrl ?? profile.links.resume,
  });
}

/**
 * @param {MouseEvent | import('react').MouseEvent} event
 * @param {{ resumeUrl?: string }} [options]
 */
export function handleResumeDownloadClick(event, options = {}) {
  event.preventDefault();
  event.stopPropagation();
  startResumeAnimation(options);
}
