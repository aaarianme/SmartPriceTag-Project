import React, {useEffect, useState} from "react";
import UserNavbar from "../Components/UserNavbar";
import { IClient } from "../Helpers/Interfaces";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useGetRequest } from "../Hooks/HttpsRequest";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import {
  PopUpTrigger,
  usePopUpManager,
  MessagePopUp,
  ErrorPopUp,
} from "../Hooks/usePopUpManager";
export default function ProfilePage() {
  const [getLS, setLS, removeLS] = useLocalStorage();
  const [userInfo, setUser] = useState<any>();
  const [isLoaded, result, makeRequest] = useGetRequest();
  const [setNewPopUp, removePopUp, popUp] = usePopUpManager();
  async function getInfo(){
    await makeRequest("api/client/get", 
    {}, 
    {
      onSuccess: displayInfo,
      onFail: ()=>{
        setNewPopUp(
        <ErrorPopUp
          header="Error Retrieving Data"
          message="Please try again..."
          buttonText="Ok"
          onButtonClick={removePopUp}></ErrorPopUp>
        );
      }
    });
  }

  function displayInfo(result)
  {
    console.log(result.data);
    setUser(result.data.user);
  }
  
  useEffect(()=>{
    getInfo();
  }, []);

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
                  Here's your profile.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow-sm">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UserId : {userInfo?.clientId} - Your
                        UserId cannot be changed
                      </label>
                      <br></br>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username : {userInfo?.username} 
                      </label>
                      <button ></button>
                      <br></br>
                      <label
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name : {userInfo?.name}
                      </label>
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
