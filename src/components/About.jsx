import { useState, useEffect } from "react"

function About() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page about home${isActive ? ' active' : ''}`}>
        <h5>Sobolev Nikita</h5>
        <h4>FullStack Web Developer</h4>
    </div>
    )
}

export default About
