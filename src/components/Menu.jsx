import { useRecoilState } from 'recoil';
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom';
import { Link, useLocation } from "react-router-dom";

function Menu() {
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)
    const location = useLocation()

    return (
    <div className={`menu${menuIsOpen ? ' active' : ''}`}>
        <div className="menu__content">
            <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='content__close'>CLOSE</button>
            <ul className='content__nav'>
                <li onClick={() => setMenuIsOpen(!menuIsOpen)} className={location.pathname === '/' ? 'current' : ''}><Link to='/'>Home</Link></li>
                <li onClick={() => setMenuIsOpen(!menuIsOpen)} className={location.pathname === '/about' ? 'current' : ''}><Link to='/about'>About</Link></li>
                <li onClick={() => setMenuIsOpen(!menuIsOpen)} className={location.pathname === '/skills' ? 'current' : ''}><Link to='/skills'>Skills</Link></li>
                <li onClick={() => setMenuIsOpen(!menuIsOpen)} className={location.pathname === '/works' ? 'current' : ''}><Link to='/works'>Works</Link></li>
            </ul>
        </div>
    </div>
    )
}

export default Menu
