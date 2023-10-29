// TODO:
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import { PackageSearch, ShoppingBag, Store, Users } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { PiSignOutBold } from "react-icons/pi";
import { getAuth } from "firebase/auth";
import { Route, useNavigate, Routes } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardOrders from "./components/DashboardOrders";
import DashboardUsers from "./components/DashboardUsers";
import DashboardProducts from "./components/DashboardProducts";
import DashboardRestaurants from "./components/DashboardRestaurants";
import DashboardSettings from "./components/DashboardSettings";
const MainDashboard = () => {
  // TODO: Add check on whether the current user is an admin or not

  // Fetching user count from the backend
  // FIXME: Not properly fetching the data from the backend
  const [usersCount, setUsersCount] = useState(23);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    fetch(
      `https://us-central1-${process.env.REACT_APP_FIREBASE_PROJECT_ID}.cloudfunctions.net/listAllUsers`
    )
      .then((response) => response.json())
      .then((data) => setUsersCount(data.length))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Size of the screen when the hamburger menu should be toggled
  const screenSizeToggled = 639;
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth > screenSizeToggled
  );

  // FIXME: Weird visual bug when clicking on a link while the page is loading
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > screenSizeToggled);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(usersCount);

  return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {isSidebarOpen && (
        <aside
          onMouseLeave={() => {
            if (window.innerWidth <= screenSizeToggled) {
              setIsSidebarOpen(false);
            }
          }}
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          {/* Not using the Navlink because this must have a full reload*/}
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <RxDashboard className="w-6 h-6" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/orders"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard/orders"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <PackageSearch className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>

                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    23
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/users"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard/users"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    {usersCount}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/products"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard/products"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    34
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/restaurants"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard/restaurants"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <Store className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Restaurants
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    12
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/settings"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${
                    window.location.pathname === "/dashboard/settings"
                      ? "text-red-500 opacity-100"
                      : ""
                  }`}
                >
                  <IoSettingsOutline className="w-6 h-6  " />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Settings
                  </span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    auth
                      .signOut()
                      .then(() => {
                        console.log("User signed out");
                        navigate("/login", { replace: true });
                        toast("Bye for now", {
                          icon: "👋",
                        });
                      })
                      .catch((error) => {
                        console.error("Error signing out: ", error);
                        toast.error("Something went wrong");
                      });
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 w-full"
                >
                  <PiSignOutBold className="w-6 h-6  " />
                  <span className="ml-3 whitespace-nowrap">Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {/* Grid Layout */}
      <div className="p-4 sm:ml-64">
        <DashboardHeader />
        <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
        <Routes>
        
        <Route path="/orders" element={<DashboardOrders/>} />
        <Route path="/users" element={<DashboardUsers/>} />
        <Route path="/products" element={<DashboardProducts/>} />
        <Route path="/restaurants" element={<DashboardRestaurants/>} />
        <Route path="/settings" element={<DashboardSettings/>} />

        </Routes>


        </div>
        
      </div>
      {/* | above Grid Layout */}
    </div>
  );
};

export default MainDashboard;
