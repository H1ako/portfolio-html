// global
import { Link, useLocation } from "react-router-dom"
// recoil
import { useRecoilState, useRecoilValue } from 'recoil'
import { cursorColorAtom, cursorColorsAtom } from "../../recoil_atoms/CursorAtom"
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom'
import { routesAtom } from "../../recoil_atoms/RouteAtom"

function FixedNav({canvas}) {
    const location = useLocation()
    // for cursor and drawing color 
    const cursorColors = useRecoilValue(cursorColorsAtom)
    const [currentColor, setCurrentColor] = useRecoilState(cursorColorAtom)
    // for menu
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)
    // for routes
    const routes = useRecoilValue(routesAtom)

    return (
    <div className="fixed-nav">
        <div className="fixed-nav__top">
            <div className={`top__about${location.pathname !== '/about' ? ' active' : ''}`}>
                <h5>Sobolev Nikita</h5>
                <h4>FullStack Web Developer</h4>
            </div>
            <div className={`top__drawing-tools${location.pathname === '/' ? ' active' : ''}`}>
                {cursorColors.map(color => (
                    <div
                        key={color}
                        onMouseEnter={() => setCurrentColor(color)}
                        className="drawing-tools__color"
                        style={{background: color}}
                    />
                ))}
                <button onClick={() => setCurrentColor('black')}>Black</button>
            </div>
        </div>
        <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='fixed-nav__menu-btn'>
            <img src="/assets/Menu.svg" alt="Menu" />
        </button>
        <a className='fixed-nav__mail' href="mailto:nikita-sobolev-wd@yandex.ru">nikita-sobolev-wd@yandex.ru</a>
        <nav>
            <div className="nav__pointer"/>
            <ul>
                {routes.map(route => (
                    <li
                        key={route.url}
                        className={location.pathname === route.url ? 'current' : ''}
                    >
                        <Link to={route.url}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
        <div className="fixed-nav__arrow">
            <img src="/assets/DownArrow.svg" alt="" />
        </div>
    </div>
    )
}

export default FixedNav
