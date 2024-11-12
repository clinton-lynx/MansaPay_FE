"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

// import { siteConfig } from "./config/site";
// import NextLink from "next/link";
import clsx from "clsx";
import { Logo } from "./icons.jsx";
import { siteConfig } from "../config/site.js";

// import { Logo } from "./components/icons.jsx";

export const Navbar = () => {
  // show shadow on scroll
  const [shadow, setShadow] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setShadow(true);
    } else {
      setShadow(false);
    }   
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="z-50 top-0 left-0 w-full fixed">
      <Fragment>
        <NextUINavbar
          maxWidth="2xl"
          position="sticky"
          className={clsx(
            shadow
              ? "border shadow-md transition-all duration-200 ease-in-out"
              : "bg-transparent",
            "md:px-6"
          )}
        >
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
                     </Link>
          </NavbarBrand>
          <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
            <ul className="hidden lg:flex gap-10">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>

          <NavbarContent
            className="hidden lg:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden md:flex gap-3">
              <Button
                // isExternal
                as={Link}
                className="text-sm font-normal text-default-900 bg-default-100 rounded-md"
                href={"/sign-in"}
                variant="flat"
              >
                Log in
              </Button>
              <Button
                // isExternal
                as={Link}
                className="text-sm font-normal text-white bg-[#0069ff] rounded-md"
                href={"/sign-up"}
                variant="flat"
                color="success"
              >
                Sign up free
              </Button> 
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            <div className="mt-[17%] flex flex-col gap-2">
              {siteConfig.navItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={"foreground"}
                    href={item.href}
                    size="lg"
                    className="text-[20px] py-[13px] font-semibold"
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
            <NavbarItem className="flex gap-4 mt-5 flex-col">
              <Button
                // isExternal
                as={Link}
                className="text-[20px] font-semibold text-default-900 bg-default-100 rounded-md border-[#0069ff] border-[1px] border-solid py-7"
                href={"/sign-in"}
                variant="flat"
              >
                Log in
              </Button>
              <Button
                // isExternal
                as={Link}
                className="text-[20px] font-semibold text-white bg-[#0069ff] rounded-md py-7"
                href={"/sign-up"}
                variant="flat"
                color="success"
              >
                Sign up free
              </Button>
            </NavbarItem>
          </NavbarMenu>
        </NextUINavbar>
      </Fragment>
    </div>
  );
};
