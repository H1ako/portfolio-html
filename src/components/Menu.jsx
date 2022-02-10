// global
import { Link, useLocation } from "react-router-dom";
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom';
import { routesAtom } from "../../recoil_atoms/RouteAtom";

function Menu() {
    const location = useLocation()
    // for menu
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)
    // for routes
    const routes = useRecoilValue(routesAtom)

    return (
    <div className={`menu${menuIsOpen ? ' active' : ''}`}>
        <div className="menu__content">
            <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='content__close'>CLOSE</button>
            <ul className='content__nav'>
                {routes.map(route => (
                    <li
                        key={route.url}
                        onClick={() => setMenuIsOpen(!menuIsOpen)}
                        className={location.pathname === route.url ? 'current' : ''}
                    >
                        <Link to={route.url}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default Menu
