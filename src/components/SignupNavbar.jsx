"use client";
import { Fragment, useEffect, useState } from "react";
import {
    Navbar as NextUINavbar,
    NavbarBrand,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Logo } from "./icons.jsx";

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
        <div className="z-50 top-0 left-0 w-full">
            <Fragment>
                <NextUINavbar
                    maxWidth="2xl"
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
                </NextUINavbar>
            </Fragment>
        </div>
    );
};
