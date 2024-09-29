import { create } from "zustand";

const LatestNewsStore = create((set) => ({
  //   viewNews: "",
  //   setViewNews: (viewNews) => set({ viewNews: viewNews }),

  latestNewsData: "",
  setLatestNewsData: (latestNewsData) =>
    set({ latestNewsData: latestNewsData }),
}));

export default LatestNewsStore;
