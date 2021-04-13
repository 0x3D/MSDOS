import React from 'react'

export default function AdminPage() {
    return (
        <div className="AdminPage">
            {/* Tänker att detta ska vara typ som knappar som man klickar på med en pane eller annat som tycker upp på skärmen
                med en React Komponent för varje vald "hantering".
                Det är bara en tanke men vi kanske vill ha det på annat sätt */}

            <ul>
                <li>
                    Hantera bokningar
                </li>
                <li>
                    Hantera användare
                </li>
                <li>
                   Lägg till facilitet 
                </li>
            </ul>
        </div>
    )
}
