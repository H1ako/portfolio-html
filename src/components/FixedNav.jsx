// global
import { Link, useLocation } from "react-router-dom"
// recoil
import { useRecoilState } from 'recoil'
import { cursorColorAtom } from "../../recoil_atoms/CursorAtom"
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom'

function FixedNav({canvas}) {
    const cursorColors = [
        '#CBCDD0',
        '#317FF3',
        '#F331A6'
    ]
    const location = useLocation()
    const [currentColor, setCurrentColor] = useRecoilState(cursorColorAtom)
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)

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
