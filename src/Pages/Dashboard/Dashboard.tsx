import { useEffect, useState } from "react"
import { Container } from "../../components/Container/Container"
import { InfoCardRedisign } from "../../components/InfoCardRedisign/InfoCardRedisign"
import { useDarkMode } from "../../context/DarkMode"

export const Dashboard = () => {
    const { darkMode } = useDarkMode()
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        })
    }, [])

    return (
        <Container>
            <div style={{
                width: '100%',
                transition: 'all 0.5s ease',
                display: 'grid',
                height: '100%',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(4, 1fr)',
                gap: '1rem',
                // backgroundColor: '#dedede',
            }}>
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '1 / 2',
                    // gridRow: '1 / 6'
                    gridColumn: isMobile ? '1 / 4' : '1 / 2',
                    gridRow: isMobile ? '1 / 3' : '1 / 6'
                }} 
                    direction={isMobile ? 'row' : 'column'}
                />
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '2 / 4',
                    // gridRow: '1 / 3'
                    gridColumn: isMobile ? '1 / 4' : '2 / 4',
                    gridRow: isMobile ? '3 / 5' : '1 / 3'
                }}
                    direction={'row'}
                />
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '2 / 4',
                    // gridRow: '3 / 6'
                    gridColumn: isMobile ? '1 / 4' : '2 / 4',
                    gridRow: isMobile ? '5 / 6' : '3 / 6'
                }}
                    direction={'row'}
                />
            </div>
        </Container>
    )
}

export default Dashboard