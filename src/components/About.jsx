import { useState, useEffect } from "react"

function About() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page about home${isActive ? ' active' : ''}`}>
        <h5 className="color-main">About</h5>
    </div>
    )
}

export default About
