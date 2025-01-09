// import { t } from "@lingui/macro";
// import { ScrollArea, Separator } from "@reactive-resume/ui";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";

// import { AccountSettings } from "./_sections/account";
// import { DangerZoneSettings } from "./_sections/danger";
// import { OpenAISettings } from "./_sections/openai";
// import { ProfileSettings } from "./_sections/profile";
// import { SecuritySettings } from "./_sections/security";
// const dir = document.querySelector('html')?.getAttribute('dir') || 'ltr';
// console.log(document.querySelector('html')?.getAttribute('dir'), "dir");
// export const SettingsPage = () => (
//   <>
//     <Helmet>
//       <title>
//         {t`Settings`} - {t`Reactive Resume`}
//       </title>
//     </Helmet>

//     <div className="max-w-2xl space-y-4">
//       <motion.h1
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="text-4xl font-bold tracking-tight"
//       >
//         {t`Settings`}
//       </motion.h1>

//       <ScrollArea hideScrollbar dir={dir} className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
//         <div className="space-y-6">
//           <AccountSettings />
//           <Separator />
//           <SecuritySettings />
//           <Separator />
//           <ProfileSettings />
//           <Separator />
//           <OpenAISettings />
//           <Separator />
//           <DangerZoneSettings />
//         </div>
//       </ScrollArea>
//     </div>
//   </>
// );

// // import { t } from "@lingui/macro";
// // import { ScrollArea, Separator } from "@reactive-resume/ui";
// // import { motion } from "framer-motion";
// // import React, { useEffect, useState } from 'react';
// // import { Helmet } from "react-helmet-async";

// // import { AccountSettings } from "./_sections/account";
// // import { DangerZoneSettings } from "./_sections/danger";
// // import { OpenAISettings } from "./_sections/openai";
// // import { ProfileSettings } from "./_sections/profile";
// // import { SecuritySettings } from "./_sections/security";

// // const SettingsPage = () => {
// //   const [dir, setDir] = useState<string>('ltr');

// //   useEffect(() => {
// //     const htmlElement = document.querySelector('html');
// //     if (htmlElement) {
// //       setDir(htmlElement.getAttribute('dir') || 'ltr');
// //     }
// //   }, []);

// //   return (
// //     <div>
// //       <Helmet>
// //         <title>
// //           {t`Settings`} - {t`Reactive Resume`}
// //         </title>
// //       </Helmet>

// //       <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //         {t`Settings`}
// //       </motion.h1>

// //       <ScrollArea hideScrollbar dir={dir} className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
// //         <div className="space-y-6">
// //           <AccountSettings />
// //           <Separator />
// //           <SecuritySettings />
// //           <Separator />
// //           <ProfileSettings />
// //           <Separator />
// //           <OpenAISettings />
// //           <Separator />
// //           <DangerZoneSettings />
// //         </div>
// //       </ScrollArea>
// //     </div>
// //   );
// // };

// // export default SettingsPage;

import { t } from "@lingui/macro";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { useDirection } from "../../../context/direction-context";
import { AccountSettings } from "./_sections/account";
import { DangerZoneSettings } from "./_sections/danger";
import { OpenAISettings } from "./_sections/openai";
import { ProfileSettings } from "./_sections/profile";
import { SecuritySettings } from "./_sections/security";
type Direction = "ltr" | "rtl";
export const SettingsPage = () => {
  const { dir } = useDirection();

  return (
    <>
      <Helmet>
        <title>
          {t`Settings`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="max-w-2xl space-y-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t`Settings`}
        </motion.h1>

        <ScrollArea
          hideScrollbar
          dir={dir}
          className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]"
        >
          <div className="space-y-6">
            <AccountSettings />
            <Separator />
            <SecuritySettings />
            <Separator />
            <ProfileSettings />
            <Separator />
            <OpenAISettings />
            <Separator />
            <DangerZoneSettings />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default SettingsPage;
