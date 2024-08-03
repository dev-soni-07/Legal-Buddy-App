import { useStateContext } from '@/context/Statecontext'
import style from '../styles/HamburgerMenuIcon.module.css'
export default function HamburgerMenuIcon() {
    const { adminMenu, setAdminMenu } = useStateContext()
    return (
        <>
            <button id={style.menu} onClick={() => setAdminMenu(!adminMenu)} className={adminMenu ? style.opened : ""} aria-label="Main Menu">
                <svg width="100" height="50" viewBox="0 0 100 100" className='z-10'>
                    <path id={style.line1} className={style.line} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                    <path id={style.line2} className={style.line} d="M 20,50 H 80" />
                    <path id={style.line3} className={style.line} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
            </button>
        </>
    )
}
