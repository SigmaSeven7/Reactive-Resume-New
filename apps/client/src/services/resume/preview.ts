// import { UrlDto } from "@reactive-resume/dto";
// import { useQuery } from "@tanstack/react-query";

// import { RESUME_PREVIEW_KEY } from "@/client/constants/query-keys";
// import { axios } from "@/client/libs/axios";

// export const previewResume = async (data: { id: string }) => {
//   const response = await axios.get<UrlDto>(`/resume/print/${data.id}/preview`);

//   return response.data;
// };

// export const useResumePreview = (id: string) => {
//   const {
//     error,
//     isPending: loading,
//     data,
//   } = useQuery({
//     queryKey: [RESUME_PREVIEW_KEY, { id }],
//     queryFn: () => previewResume({ id }),
//   });

//   return { url: data?.url, loading, error };
// };


import { UrlDto } from "@reactive-resume/dto";
import { ResumeData } from "@reactive-resume/schema";
import { useCallback, useEffect, useRef } from "react";

import { axios } from "@/client/libs/axios";

export const previewResume = async (data: { id: string }) => {
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}/preview`);
  return response.data;
};

export const useResumePreview = (resume: ResumeData) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef.current?.contentWindow) return;

    const message = {
      type: "SET_RESUME",
      payload: resume
    };

    (() => {
      frameRef.current.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, resume]);

  useEffect(() => {
    if (!frameRef.current) return;

    frameRef.current.addEventListener("load", updateResumeInFrame);

    return () => {
      frameRef.current?.removeEventListener("load", updateResumeInFrame);
    };
  }, [frameRef, updateResumeInFrame]);

  return frameRef;
};