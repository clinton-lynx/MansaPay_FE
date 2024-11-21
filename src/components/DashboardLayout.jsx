"use client";
import { Fragment, useEffect, useState } from "react";
import {
  DialogPanel,
  MenuButton,
  Menu,
  MenuItems,
  MenuItem,
  TransitionChild,
  Dialog,
  Transition,
} from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  LinkIcon,
  HelpIcon,
  TemplatesIcon,
  AnalyticsIcon,

  LineDivider,
} from "./icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Logo } from "./icons.jsx";
// import { getUserProfile } from "../stores/authStore";
// import { usePathname } from "react";
const navigation = [
  { name: "Home", href: "/dashboard", icon: LinkIcon, current: true },
  {
    name: "Payment Pages",
    href: "/dashboard/payment-links",
    icon: TemplatesIcon,
    current: false,
  },
  {
    name: "Payout Details",
    href: "/dashboard/payout-details",
    icon: AnalyticsIcon,
    current: false,
  },
];
const mobileNavigation = [
  { name: "Home", href: "/dashboard", icon: LinkIcon, current: true },
  {
    name: "Payment Pages",
    href: "/dashboard/payment-links",
    icon: TemplatesIcon,
    current: false,
  },
  {
    name: "Payout Details",
    href: "/dashboard/payout-details",
    icon: AnalyticsIcon,
    current: true,
  },
  {
    name: "Sign Out",
    href: "#",  // Keep it as '#' or any placeholder, as the link won't be used.
    icon: HelpIcon,
    current: false,
    onClick: () => {
      // Call the logout function when clicked
      useAuthStore.getState().logout(); 
  
    },
  }
];
const belowNavigation = [
  {
    name: "Sign Out",
    href: "#",  // Keep it as '#' or any placeholder, as the link won't be used.
    icon: HelpIcon,
    current: false,
    onClick: () => {
      // Call the logout function when clicked
      useAuthStore.getState().logout(); 
    },
  }
];
const userNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Payment Pages", href: "/payment-pages" },
  { name: "Payout", href: "/payout-details" },
  {
    name: "Sign Out",
    href: "#",  // Keep it as '#' or any placeholder, as the link won't be used.
    icon: HelpIcon,
    current: false,
    onClick: () => {
      // Call the logout function when clicked
      useAuthStore.getState().logout(); 
    }, },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import PropTypes from "prop-types";
import { WhiteLogo } from "./icons";

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const location = useLocation();
  const pathname = location.pathname;
  const logout = useAuthStore((state) => state.logout); // Get the logout function from your auth store
  const getUserProfile = useAuthStore((state) => state.getUserProfile); // Get the logout function from your auth store
  console.log(pathname);

  useEffect(() => {
    // console.log("effect");
    
    const fetchUserProfile = async () => {
      try {
        const userDetails = await getUserProfile(navigate); // Fetch user details
        setUser(userDetails); // Set user data
      } catch (err) {
        setError(err.message); // Set error if any
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchUserProfile(); // Call the fetch function on component mount
  }, []);

  if (loading) {
    return  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    {/* Spinning Coin */}
    <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-xl font-extrabold">
            M
        </div>
    </div>
    {/* Loader Text */}
    <p className="mt-4 text-lg text-gray-700 animate-pulse font-semibold">
        Loading MansaPay...
    </p>
</div>; // Show a loading indicator while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if fetching fails
  }

  return (
    <>
      {/* NAVIGATION MENU FOR MOBILE */}
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-700 pt-5 pb-4">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>

                  <div className="flex flex-shrink-0 items-center px-4">
                    <Logo />
                 
                  </div>
                  <div className="mt-8 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {mobileNavigation.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={(e) => {
                              if (item.name === "Sign Out") {
                                e.preventDefault(); // Prevent default navigation for Sign Out
                                item.onClick(); 
                                navigate('/login')// Trigger the logout function
                              }
                              // You can handle other navigation logic here
                            }}
                            className={classNames(
                              isActive
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-blue-600",
                              "group flex items-center px-2 py-4 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 flex-shrink-0 text-white"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* STATIC SIDEBAR FOR DESKTOP */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-48 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-blue-700 pt-8">
            <div className="flex flex-shrink-0 flex-col justify-center items-center px-4">
              <div className="logo-wrapper block mb-6">
                <WhiteLogo />
              </div>

              {/* <h3 className="text-white text-xl font-semibold block">
                MansaPay
              </h3> */}
            </div>
            <div className="mt-10 flex justify-center items-center flex-1 flex-col">
              <nav className="flex flex-col items-start flex-1 space-y-8 px-2 pb-4 max-w-xs">
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => {
                        if (item.name === "Sign Out") {
                          e.preventDefault(); // Prevent default navigation for Sign Out
                          item.onClick();
                          navigate('/login') // Trigger the logout function
                        }
                        // You can handle other navigation logic here
                      }}
                      className={classNames(
                        isActive
                          ? " mt-5 w-full bg-white text-blue-700"
                          : " mt-5  w-full text-white hover:bg-[#1a1b58]",
                        "group flex justify-start  items-center  px-8 py-2 text-sm font-medium rounded-md text-left"
                      )}
                      // className={isActive ? " mt-5 w-full bg-white text-dashboard-green" : " mt-5  w-full text-indigo-100 hover:bg-indigo-600 " }
                    >
                      <item.icon
                        fill={isActive ? "#287774" : "#fff"}
                        className="mr-12 ml-5 h-26 w-16 flex-shrink-0 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
                <div className=" mt-5">
                  <LineDivider />
                </div>
                {belowNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => {
                        if (item.name === "Sign Out") {
                          e.preventDefault(); // Prevent default navigation for Sign Out
                          item.onClick();
                          navigate('/login') // Trigger the logout function
                        }
                        // You can handle other navigation logic here
                      }}
                      className={classNames(
                        isActive
                          ? " mt-5 w-full bg-white text-dashboard-green "
                          : " mt-5  w-full text-indigo-100 hover:bg-[#96dcd9]",
                        "group flex justify-start  items-center px-8 py-2 text-sm font-medium rounded-md text-left"
                      )}
                      // className={isActive ? " mt-5 w-full bg-white text-dashboard-green" : " mt-5  w-full text-indigo-100 hover:bg-indigo-600 " }
                    >
                      <item.icon
                        fill={isActive ? "#287774" : "#fff"}
                        className="mr-12 h-26 w-16 flex-shrink-0 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-48">
          <div className="sticky top-0 z-10 flex h-20 flex-shrink-0 bg-white pt-8 shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4 ">
              <div className="flex flex-1 items-center">
                <h2 className="text-black text-opacity-80 lg:text-[28px] text-[15px] md:text-[20px] font-medium font-['Poppins']">
                  Welcome Back
                  <span className="font-bold">
                    {" "}
                    {user?.name || "User"}
                  </span>, <span className="capitalize font-extrabold"></span>
                </h2>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User avatar"
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <button
                              className={`
                    ${active ? "bg-gray-100" : ""}
                    block px-4 py-2 text-sm text-gray-700 w-full text-start
                  `}
                              onClick={() => {
                                if (item.name === "Sign out") {
                                  logout(); // Call the logout function when "Sign out" is clicked
                                } else {
                                  console.log(`Navigating to ${item.href}`);
                                  // Optional: Implement actual navigation if needed, e.g., with a router
                                }
                              }}
                            >
                              {item.name}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
