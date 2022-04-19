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

export const cursorIsActiveAtom = atom({
    key: 'cursorIsActiveAtom',
    default: false
})

export const cursorInnerPositionAtom = atom({
    key: 'cursorInnerPositionAtom',
    default: {x: 0, y: 0}
})