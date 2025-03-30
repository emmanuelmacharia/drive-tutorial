"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";

export default function PostHogPageView() {
  const userInfo = useUser();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (userInfo.user?.id) {
      posthog.identify(userInfo.user?.id, {
        email: userInfo.user?.emailAddresses[0]?.emailAddress,
        username: userInfo.user?.username,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, userInfo.user]);

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
