import { auth } from "~/lib/connect";

export const onGet = auth.callbackHandler;
