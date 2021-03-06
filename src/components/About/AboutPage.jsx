import React, { } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Image, CardDeck } from 'react-bootstrap'
import '../../styles/AboutPage.css'
import '../../styles/App.css'
import House from '../../assets/BrfLemansgatan.jpeg'
import codeStock from '../../assets/stockCodePic.jpeg'
import Hello from '../../assets/hello.jpg'
import CardsUI from './CardsUI'

export default function AboutPage () {
  /**
     * This is the about page where we have gathered information about the project.
     */

  /**
   * Here we have gathered information that is supposed to appear on the specific cards
   */

  const contactUsString = 'Är du intresserad av vår applikation och vill komma i kontakt med oss? Följ länken nedan!'
  const contactUsTitle = 'Kontakta oss'
  const contactUsLinkURL = 'mailto: msdosmsdos1@gmail.com'

  const sourceCodeTitle = 'Källkod'
  const sourceCode = 'Vill du veta mer om projektet? Följ länken för att komma till vårt GitHub repo'
  const sourceCodeLink = 'https://github.com/0x3D/MSDOS'
  const sourceCodeLinkName = 'Github'

  return (
    <div>
      <h1>
        <Image src={House} height={300} width={900} className='shadow-lg p-3 mb-5 bg-white rounded' />
      </h1>
      <h5>
        Om oss
      </h5>
      <div>
        <p> MSDOS utvecklades som ett skolprojekt i kusen Agile software project management för att hjälpa BRF Lemansgatan att digitalisera fastighetens analoga bokningar av tvättstuga, gym och övernattningslägenhet. </p>
      </div>
      <div>

        <CardDeck>
          <CardsUI imgsrc={Hello} cardText={contactUsString} cardTitle={contactUsTitle} linkName={contactUsTitle} linkURL={contactUsLinkURL} />
          <CardsUI imgsrc={codeStock} cardText={sourceCode} cardTitle={sourceCodeTitle} linkName={sourceCodeLinkName} linkURL={sourceCodeLink} />
        </CardDeck>

      </div>
    </div>
  )
}
