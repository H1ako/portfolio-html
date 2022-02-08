import { useState, useEffect } from "react"

function Works() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page works home${isActive ? ' active' : ''}`}>
        <h5 className="color-main">Works</h5>
    </div>
    )
}

export default Works
