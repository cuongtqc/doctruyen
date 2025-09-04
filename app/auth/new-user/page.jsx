"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const NewUser = () => {
  const { data: sessionData } = useSession();
  const params = useSearchParams();

  const goOnboard = () => {
    const callbackUrl = params.get("callbackUrl");
    window.location.href = decodeURIComponent(callbackUrl);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 p-10 shadow-2xl backdrop-blur-md backdrop-filter">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Hello, {sessionData?.user?.name}
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            You are signed in using{" "}
            <span className="font-light text-gray-100">
              {sessionData?.user?.email}
            </span>
          </p>
          <button
            onClick={goOnboard}
            className="mt-8 rounded-full bg-indigo-500 px-8 py-3 text-lg font-semibold tracking-wide text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

const NewUserPage = () => {
  return (
    <Suspense>
      <NewUser />
    </Suspense>
  );
};

export default NewUserPage;
