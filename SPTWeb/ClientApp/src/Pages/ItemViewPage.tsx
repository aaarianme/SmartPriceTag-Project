import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import LoaderAnimator from "../Components/LoaderAnimator";
import LoadingAnimatorSmall from "../Components/loadingAnimatorSmall";
import StoreNav from "../Components/StoreNav";
import { ICampaign, IFullItemDetails, IItem } from "../Helpers/Interfaces";
import { useGetRequest } from "../Hooks/HttpsRequest";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import useLocalStorage from "../Hooks/useLocalStorage";
import {
  ErrorPopUp,
  PopUpTrigger,
  usePopUpManager,
} from "../Hooks/usePopUpManager";
import PageNotFound from "./PageNotFound";
interface IPageState {
  itemsLoaded: boolean;
  itemDetails: IFullItemDetails;
  currentImageIndex: number;
  pageError: boolean;
  campaigns: Array<ICampaign>;
  campaignsLoaded: boolean;
}
export default function ItemViewPage() {
  const { itemId } = useParams();
  const [getLS, setLS, removeLS] = useLocalStorage();
  const [state, setState] = useState<IPageState>({
    itemsLoaded: false,
    itemDetails: null,
    currentImageIndex: 0,
    pageError: false,
    campaigns: null,
    campaignsLoaded: false,
  });
  const [setPopUp, removePopUp, popUp] = usePopUpManager();
  const [loaded, res, makeGetRequest] = useGetRequest();
  async function pageSetUp() {
    if (isNaN(itemId as any)) return;
    let id = parseInt(itemId);
    let allSavedItems = getLS<Array<IFullItemDetails>>("fullStoreInfo");
    console.log("allSaved", allSavedItems);
    await makeGetRequest(
      "/api/items/" + id,
      {},
      {
        onSuccess: (res) => {
          let { item } = res.data;
          setState({ ...state, itemDetails: item });
        },
        onFail: () => {
          setState((pre) => ({ ...pre, pageError: true }));
        },
        finally: () => {
          setState((pre) => ({ ...pre, itemsLoaded: true }));
        },
      }
    );
    await makeGetRequest(
      "/api/campaigns/item/" + id,
      {},
      {
        onSuccess: (res) => {
          let { campaigns } = res.data;
          setState((pre) => ({ ...pre, campaigns: campaigns }));
        },
        onFail: (res) => {
          setPopUp(
            <ErrorPopUp
              header="Failed loading data"
              message="Campaigns were not loaded."
              onButtonClick={removePopUp}
              buttonText="Okay"
              retry={{
                canRetry: true,
                retryFunction: () => {},
                retryButtonText: "Try Again",
              }}
            />
          );
        },
        finally: () => {
          setState((pre) => ({ ...pre, campaignsLoaded: true }));
        },
      }
    );
  }
  useEffect(() => {
    console.log("state is", state);
  }, [state]);
  useEffect(() => {
    pageSetUp();
  }, []);
  if (isNaN(itemId as any))
    return <PageNotFound error="Item not found"></PageNotFound>;
  if (!state.itemsLoaded)
    return (
      <FullPageLoadingAnimator
        show={!state.itemsLoaded}
        text={"Loading Item #" + itemId}
      ></FullPageLoadingAnimator>
    );
  if (state.pageError)
    return <PageNotFound error="Item not found"></PageNotFound>;
  return (
    state.itemDetails.item && (
      <>
        <StoreNav></StoreNav>
        <div className="p-10">
          {state.itemDetails.item.productDesc && (
            <p className="text-slate-700 mb-5 ">
              Description:
              <span className="">{state.itemDetails.item.productDesc}</span>
            </p>
          )}
          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className="lg:flex lg:items-center">
                <div className="w-full space-y-4 lg:w-1/2 ">
                  <div>
                    <h1 className="text-3xl font-thin text-zinc-800 capitalize lg:text-4xl">
                      {`${state.itemDetails.item.name}  #${state.itemDetails.item.internalID}`}
                    </h1>
                  </div>

                  <div className="md:flex md:items-start md:-mx-4">
                    <div className="md:mx-4 md:mt-0 border rounded">
                      <p className="text-zinc-800 p-2">
                        {`Weight: ${state.itemDetails.item.weight} KG - Net Weight ${state.itemDetails.item.netWeight} KG`}
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-600 p-2 text-xs">
                    {state.itemDetails.images.length} Image(s) available
                  </p>
                  {state.itemDetails.item.productDesc && (
                    <div className="md:flex md:items-start md:-mx-4">
                      <div className="mt-4 md:mx-4 md:mt-0">
                        <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                          Description
                        </h1>
                        <p className="text-zinc-800 p-2">
                          state.itemDetails.item.productDesc
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="md:flex md:items-start md:-mx-4">
                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                        Campaigns
                      </h1>
                      {!state.campaignsLoaded ? (
                        <div>
                          <LoadingAnimatorSmall></LoadingAnimatorSmall>
                        </div>
                      ) : state.campaigns?.length == 0 ? (
                        <a href="/s/tags">
                          - Go to Tag Manager to add a campaign
                        </a>
                      ) : (
                        <div className="pl-2 pt-2">
                          <ul className="space-y-1 text-gray-500 list-inside">
                            {state.campaigns.map((x, i) => (
                              <li className="flex items-center">
                                {x.isActive && (
                                  <svg
                                    className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                )}
                                {x.startDate == null && x.endDate == null ? (
                                  <label>{x.isPrice}$ as defualt</label>
                                ) : (
                                  <label>
                                    {x.wasPrice && (
                                      <span className="text-yellow-500">
                                        <s>{x.wasPrice}$</s>
                                      </span>
                                    )}
                                    <span className="text-zinc-600">
                                      {" "}
                                      {x.isPrice}${" "}
                                    </span>
                                    {new Date(x.endDate).toDateString()} to{" "}
                                    {new Date(x.endDate).toDateString()}
                                  </label>
                                )}
                                <a
                                  className="px-1"
                                  href={"/s/campaign/" + x.campaignId}
                                >
                                  <ArrowTopRightOnSquareIcon className="w-4" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
                  {state.itemDetails.images.length == 0 ? (
                    <div className="flex flex-col justify-center w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] py-3">
                      <span className="block text-center text-zinc-400">
                        No images found
                      </span>
                    </div>
                  ) : (
                    <img
                      className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-sm py-3 cursor-pointer"
                      src={
                        "data:image/jpeg;base64," +
                        state.itemDetails.images[state.currentImageIndex]
                      }
                      alt=""
                      onClick={() => {
                        if (
                          state.currentImageIndex ==
                          state.itemDetails.images.length - 1
                        )
                          setState((pre) => ({ ...pre, currentImageIndex: 0 }));
                        else
                          setState((pre) => ({
                            ...pre,
                            currentImageIndex: pre.currentImageIndex + 1,
                          }));
                      }}
                    />
                  )}
                </div>
              </div>

              <hr className="border-gray-200 my-12 dark:border-gray-700" />

              <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5"></div>
            </div>
          </section>
        </div>
        <PopUpTrigger popUp={popUp}></PopUpTrigger>
      </>
    )
  );
}
