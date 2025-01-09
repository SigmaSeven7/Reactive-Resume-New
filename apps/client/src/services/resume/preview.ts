// // // import { UrlDto } from "@reactive-resume/dto";
// // // import { useQuery } from "@tanstack/react-query";

// // // import { RESUME_PREVIEW_KEY } from "@/client/constants/query-keys";
// // // import { axios } from "@/client/libs/axios";

// // // export const previewResume = async (data: { id: string }) => {
// // //   const response = await axios.get<UrlDto>(`/resume/print/${data.id}/preview`);

// // //   return response.data;
// // // };

// // // export const useResumePreview = (id: string) => {
// // //   const {
// // //     error,
// // //     isPending: loading,
// // //     data,
// // //   } = useQuery({
// // //     queryKey: [RESUME_PREVIEW_KEY, { id }],
// // //     queryFn: () => previewResume({ id }),
// // //   });

// // //   return { url: data?.url, loading, error };
// // // };

// // // import { useQuery } from "@tanstack/react-query";
// // // import { RESUME_PREVIEW_KEY } from "@/client/constants/query-keys";

// preview.ts
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

// filepath: /c:/Users/Oryan/Reactive-Resume-New/apps/client/src/services/resume/preview.ts

import { ResumeData } from "@reactive-resume/schema";
import { useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

export const useResumePreview = (resume: ResumeData) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const capturePreview = useCallback(async () => {
    const iframe = frameRef.current;
    if (!iframe?.contentDocument?.body) return;

    try {
      // Wait a bit longer to ensure content is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 0));

      const canvas = await html2canvas(iframe.contentDocument.body, {
        scale: 1,
        useCORS: true,
        logging: true, // Enable logging to debug
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: iframe.contentDocument.body.scrollWidth,
        height: iframe.contentDocument.body.scrollHeight,
      });

      setPreviewUrl(canvas.toDataURL("image/png", 1.0));
    } catch (error) {
      console.error("Preview capture failed:", error);
    }
  }, []);

  const handleFrameLoad = useCallback(async () => {
    if (!frameRef.current?.contentWindow) return;

    // First set the resume data
    frameRef.current.contentWindow.postMessage(
      {
        type: "SET_RESUME",
        payload: resume,
      },
      "*",
    );

    // Then capture after content should be rendered
    await capturePreview();
  }, [resume, capturePreview]);

  useEffect(() => {
    const iframe = frameRef.current;
    if (!iframe) return;

    iframe.addEventListener("load", handleFrameLoad);
    return () => {
      iframe.removeEventListener("load", handleFrameLoad);
    };
  }, [handleFrameLoad]);

  // Also try to recapture when resume changes
  useEffect(() => {
    capturePreview();
  }, [resume, capturePreview]);

  return { frameRef, previewUrl };
};
