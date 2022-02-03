import { useRecoilState } from 'recoil';
import { menuIsOpenAtom } from '../../recoil_atoms/NavAtom';

function Menu() {
    const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom)
    console.log(menuIsOpen)

    return (
    <div className={`menu${menuIsOpen ? ' active' : ''}`}>
        <div className="menu__content">
            <button onClick={() => setMenuIsOpen(!menuIsOpen)} className='content__close'>CLOSE</button>
            <ul className='content__nav'>
                <li className='current'>Home</li>
                <li className=''>About</li>
                <li className=''>Skills</li>
                <li className=''>Works</li>
            </ul>
        </div>
    </div>
    )
}

export default Menu
