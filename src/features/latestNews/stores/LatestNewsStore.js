import { create } from "zustand";


const LatestNewsStore = create((set) => ({

    // News

    viewNews: "",
    setViewNews: (viewNews) => set({ viewNews: viewNews }),

    // News
}))

export default LatestNewsStore;