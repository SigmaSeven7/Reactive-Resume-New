import { SidebarSimple } from "@phosphor-icons/react";
import { Button, Sheet, SheetClose, SheetContent, SheetTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useDirection } from "../../context/direction-context";
import { Sidebar } from "./_components/sidebar";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { dir } = useDirection();
  return (
    <div dir={dir} className="flex flex-col lg:flex-row">
      <div className="sticky top-0 z-50 flex justify-between p-4 pb-0 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="bg-background">
              <SidebarSimple />
            </Button>
          </SheetTrigger>

          <SheetContent showClose={false} side="left" className="focus-visible:outline-none">
            <SheetClose asChild className="absolute left-4 top-4">
              <Button size="icon" variant="ghost">
                <SidebarSimple />
              </Button>
            </SheetClose>

            <Sidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        dir={dir}
        className={`hidden lg:inset-y-0 ${dir === "rtl" ? "lg:left-0" : "lg:right-0"} lg:z-50 lg:flex lg:w-[320px] lg:flex-col`}
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>
      <div className="flex w-full justify-center lg:justify-start">
        <main className="mx-6 my-4 w-4/5 lg:mx-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
