import { atom } from "recoil";

export const routesAtom = atom({
    key: 'routesAtom',
    default: [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'About',
            url: '/about'
        },
        
        {
            name: 'Skills',
            url: '/skills'
        },
        
        {
            name: 'Works',
            url: '/works'
        }
    ]
})