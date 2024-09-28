import { create } from "zustand";


const useNewsStore = create((set) => ({

    // News

    viewNews: "",
    setViewNews: (viewNews) => set({ viewNews: viewNews }),

    // News
}))

export default useNewsStore;