import React from "react";
import StoreNav from "../Components/StoreNav";
import { LinkCard } from "../Components/CustomCards";
import {
  BuildingStorefrontIcon,
  UserCircleIcon,
  PresentationChartBarIcon,
  CircleStackIcon,
  RectangleGroupIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import useLocalStorage from "../Hooks/useLocalStorage";
import { IStore } from "../Helpers/Interfaces";
export default function StoreDashboard() {
  const [getLS, setLS, removeLS] = useLocalStorage();
  var storeInfo = getLS<IStore>("userInfo");

  return (
    <div className="bg-zinc-800 h-screen">
      <StoreNav />
      <div className="">
        <main>
          <section className="px-20 pt-10">
            <div className="col-span-5 bo border-b-2 border-zinc-500">
              <div className="flex flex-row justify-between">
                <label className="text-5xl font-thin text-zinc-400 px-3 mb-3">
                  Store #{storeInfo.branchNumber}
                </label>
                <label className="text-xl font-thin text-zinc-600 px-3 mb-3">
                  CentralHub
                </label>
              </div>
            </div>
            <div className=" grid grid-cols-5 py-6 min-h-full grid-rows-2 gap-x-3 gap-y-3 px-4">
              <div className="col-span-2">
                <LinkCard
                  Icon={<RectangleGroupIcon className="text-white" />}
                  text="Manage Tags"
                  className="bg-green-600"
                  link="/s/tags"
                ></LinkCard>
              </div>
              <div className="col-span-2">
                <LinkCard
                  Icon={<CircleStackIcon className="text-white" />}
                  text="Items Database"
                  className="bg-pink-600"
                  link="/s/items"
                ></LinkCard>
              </div>
              <div className="">
                <LinkCard
                  Icon={<ArrowLeftCircleIcon className="text-white" />}
                  text="Sign Out"
                  className="bg-red-800"
                  link="/signout"
                ></LinkCard>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
