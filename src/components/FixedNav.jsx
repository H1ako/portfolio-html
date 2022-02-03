import { useRecoilState } from 'recoil';
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom';

function FixedNav() {
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)

    return (
    <div className="fixed-nav">
        <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='fixed-nav__menu-btn'>
            <img src="/assets/Menu.svg" alt="Menu" />
        </button>
        <a className='fixed-nav__mail' href="mailto:nikita-sobolev-wd@yandex.ru">nikita-sobolev-wd@yandex.ru</a>
        <nav>
            <div className="nav__pointer"/>
            <ul>
                <li className='current'>Home</li>
                <li className=''>About</li>
                <li className=''>Skills</li>
                <li className=''>Works</li>
            </ul>
        </nav>
        <div className="fixed-nav__arrow">
            <img src="/assets/DownArrow.svg" alt="" />
        </div>
    </div>
    )
}

export default FixedNav
