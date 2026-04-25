"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/locale";

export default function SetDocumentLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "vi" ? "vi" : "en";
  }, [locale]);
  return null;
}
