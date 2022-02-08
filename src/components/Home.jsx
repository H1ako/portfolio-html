import { useState, useEffect } from "react"

function Home() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page home${isActive ? ' active' : ''}`}>
        <h5 className="color-main">Sobolev Nikita</h5>
        <h4>FullStack Web Developer</h4>
    </div>
    )
}

export default Home
