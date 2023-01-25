import React, { useEffect, useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  RectangleGroupIcon,
  CircleStackIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { LinkCard } from "../Components/CustomCards";
import { useGetRequest } from "../Hooks/HttpsRequest";
import { IClient } from "../Helpers/Interfaces";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [loaded, res, makeGetRequest] = useGetRequest();
  const [state, setState] = useState<IClient>({} as IClient);
  const navigate = useNavigate();

  async function getUser() {
    await makeGetRequest(
      "/api/client",
      {},
      {
        onSuccess: (res) => {
          setState(res.data.user);
        },
        onFail: () => {
          navigate("/notfound");
        },
      }
    );
  }
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <UserNavbar></UserNavbar>
      <div>
        <main>
          <section className="px-20 pt-10">
            <div className="col-span-5 bo border-b-2">
              <label className="text-5xl font-thin text-gray-600 px-3 mb-3">
                Hi {state.name}!
              </label>
            </div>
            <div className="bg-white grid grid-cols-5 py-6 min-h-full grid-rows-2 gap-x-3 gap-y-3 px-4">
              <div className="col-span-2">
                <LinkCard
                  Icon={<BuildingStorefrontIcon className="text-white" />}
                  text="View All Stores"
                  className="bg-blue-500"
                  link="/u/stores"
                ></LinkCard>
              </div>
              <div className="">
                <LinkCard
                  Icon={<UserCircleIcon className="text-white" />}
                  text="MyProfile"
                  className="bg-gray-500"
                  link="/u/profile"
                ></LinkCard>
              </div>
              <div className="col-span-2">
                <LinkCard
                  Icon={<PresentationChartBarIcon className="text-white" />}
                  text="Store Reports"
                  className="bg-yellow-600"
                  link="/u/stores/report"
                ></LinkCard>
              </div>
              <div className="col-span-2">
                <LinkCard
                  Icon={<RectangleGroupIcon className="text-white" />}
                  text="Update All Tags"
                  className="bg-green-600"
                  link="/u/UpdateTags"
                ></LinkCard>
              </div>
              <div className="col-span-2">
                <LinkCard
                  Icon={<CircleStackIcon className="text-white" />}
                  text="Items Database"
                  className="bg-pink-600"
                  link="/u/items"
                ></LinkCard>
              </div>
              <div className="">
                <LinkCard
                  Icon={<ArrowLeftCircleIcon className="text-white" />}
                  text="Sign Out"
                  className="bg-red-800"
                  link="/u/items"
                ></LinkCard>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
