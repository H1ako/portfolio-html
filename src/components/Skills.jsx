import { useState, useEffect } from "react"

function Skills() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page skills home${isActive ? ' active' : ''}`}>
        <h5 className="color-main">Skills</h5>
    </div>
    )
}

export default Skills
