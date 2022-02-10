import { useState, useEffect } from "react"

function Home() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(true)
    }, [])

    return (
    <div className={`page home${isActive ? ' active' : ''}`}>
        
    </div>
    )
}

export default Home
