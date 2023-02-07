import React, { useEffect, useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import { IClient } from "../Helpers/Interfaces";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useGetRequest } from "../Hooks/HttpsRequest";
import { usePostRequest } from "../Hooks/HttpsRequest";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import {
  usePopUpManager,
  MessagePopUp,
  ErrorPopUp,
  FullPageLoaderPopUp,
} from "../Hooks/usePopUpManager";
export default function ProfilePage() {
  const [getLS, setLS, removeLS] = useLocalStorage();
  const [userInfo, setUser] = useState<any>();
  const [editInfo, setEdit] = useState<Boolean>(false);
  const postReq = usePostRequest();
  const [isLoaded, result, makeRequest] = useGetRequest();
  const [setNewPopUp, removePopUp, popUp] = usePopUpManager();

  async function getInfo() {
    await makeRequest(
      "api/client/get",
      {},
      {
        onSuccess: displayInfo,
        onFail: () => {
          setNewPopUp(
            <ErrorPopUp
              header="Error Retrieving Data"
              message="Please try again..."
              buttonText="Ok"
              onButtonClick={removePopUp}
            ></ErrorPopUp>
          );
        },
      }
    );
  }

  function displayInfo(result) {
    setUser(result.data.user);
  }

  function AllowInput() {
    console.log("AllowInput");
    setEdit(true);
  }

  async function ProcessUpdate() {
    var newUsn = (document.querySelector("#usn") as HTMLInputElement).value;
    var newName = (document.querySelector("#name") as HTMLInputElement).value;

    //Error checking
    if (newUsn.length < 0)
      setNewPopUp(
        <ErrorPopUp
          header="Username must be greater than 1 charcter"
          message="Please try again..."
          buttonText="Ok"
          onButtonClick={removePopUp}
        ></ErrorPopUp>
      );

    if (newName.length < 0)
      setNewPopUp(
        <ErrorPopUp
          header="Name must be greater than 1 character"
          message="Please try again..."
          buttonText="Ok"
          onButtonClick={removePopUp}
        ></ErrorPopUp>
      );

    setNewPopUp(<FullPageLoaderPopUp loadingText="Updating Information..." />);

    let params = {};
    params = { username: newUsn, name: newName, clientid: userInfo.clientId };

    await postReq("api/client/update", params, {
      onSuccess: getInfo,
      onFail: () => {
        setNewPopUp(
          <ErrorPopUp
            header="Error Updating Data"
            message="Please try again later..."
            buttonText="Ok"
            onButtonClick={removePopUp}
          ></ErrorPopUp>
        );
      },
    });

    setEdit(false);
  }

  useEffect(() => {
    getInfo();
  }, [userInfo?.data]);

  return (
    <div>
      <FullPageLoadingAnimator show={!isLoaded} />
      <UserNavbar></UserNavbar>
      <div>
        <div className="p-20 pt-10">
          <div className="">
            <div className="">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  View and edit your profile.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow-sm">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        onClick={() => {
                          AllowInput();
                        }}
                      >
                        <svg
                          className="fill-current w-4 h-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.5858,4.41421 C15.3668,3.63316 16.6332,3.63316 17.4142,4.41421 L17.4142,4.41421 C18.1953,5.19526 18.1953,6.46159 17.4142,7.24264 L9.13096,15.5259 L6.10051,15.7279 L6.30254,12.6975 L14.5858,4.41421 Z" />
                        </svg>
                      </button>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <span className="font-bold text-base">UserId :</span>
                        <br></br>
                        {userInfo?.clientId}
                        {editInfo == true && (
                          <p>Your UserId cannot be changed</p>
                        )}
                      </label>
                      <br></br>
                      <div className="block text-sm font-medium text-gray-700">
                        <label>
                          <span className="font-bold text-base">
                            Username :
                          </span>
                          {editInfo == true && (
                            <>
                              <br></br>
                              <input
                                className="shadow rounded text-center"
                                id="usn"
                                type="text"
                                defaultValue={userInfo?.username}
                              ></input>
                            </>
                          )}
                          {editInfo == false && <p>{userInfo?.username}</p>}
                        </label>
                      </div>
                      <br></br>
                      <div className="block text-sm font-medium text-gray-700">
                        <label>
                          <span className="font-bold text-base">Name : </span>
                          {editInfo == true && (
                            <>
                              <br></br>
                              <input
                                className="shadow rounded text-center"
                                id="name"
                                type="text"
                                defaultValue={userInfo?.name}
                              ></input>
                            </>
                          )}
                          {editInfo == false && <p>{userInfo?.name}</p>}
                        </label>
                      </div>
                      <br></br>
                      <div className="flex text-sm font-medium text-gray-700">
                        {editInfo == true && (
                          <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            id="submitbtn"
                            onClick={() => ProcessUpdate()}
                          >
                            Save Changes
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
