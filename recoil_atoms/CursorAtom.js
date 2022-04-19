import { atom } from "recoil";

export const cursorColorAtom = atom({
    key: 'cursorColorAtom',
    default: '#CBCDD0'
})

export const cursorColorsAtom = atom({
    key: 'cursorColorsAtom',
    default: [
        '#CBCDD0',
        '#317FF3',
        '#F331A6'
    ]
})