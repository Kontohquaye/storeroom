"use server";
import { storeDateType } from "@/app/types/store";
import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";

export const createStore = async (data: storeDateType) => {
  const session = await auth();
  // console.log(session);

  const user = {
    _type: "reference",
    _ref: session?.user?.id,
  };

  try {
    await writeClient.create({
      _type: "store",
      ...data,
      owner: { ...user },
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};
