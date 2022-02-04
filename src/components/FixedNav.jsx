import { useRecoilState } from 'recoil';
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom';
import { Link, useLocation } from "react-router-dom";

function FixedNav() {
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)
    const location = useLocation()

    return (
    <div className="fixed-nav">
        <div className={`fixed-nav__about${location.pathname !== '/' ? ' active' : ''}`}>
            <h5>Sobolev Nikita</h5>
            <h4>FullStack Web Developer</h4>
        </div>
        <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='fixed-nav__menu-btn'>
            <img src="/assets/Menu.svg" alt="Menu" />
        </button>
        <a className='fixed-nav__mail' href="mailto:nikita-sobolev-wd@yandex.ru">nikita-sobolev-wd@yandex.ru</a>
        <nav>
            <div className="nav__pointer"/>
            <ul>
                <li className={location.pathname === '/' ? 'current' : ''}><Link to='/'>Home</Link></li>
                <li className={location.pathname === '/about' ? 'current' : ''}><Link to='/about'>About</Link></li>
                <li className={location.pathname === '/skills' ? 'current' : ''}><Link to='/skills'>Skills</Link></li>
                <li className={location.pathname === '/works' ? 'current' : ''}><Link to='/works'>Works</Link></li>
            </ul>
        </nav>
        <div className="fixed-nav__arrow">
            <img src="/assets/DownArrow.svg" alt="" />
        </div>
    </div>
    )
}

export default FixedNav
