import React from 'react'
import style from './style.scss'
import Header from '../../Components/Header'
import { LanguageContext } from '../../Components/SwitcherLang/'
import { Intro } from './Sections'

const Karbon = () => (
  <LanguageContext.Consumer>
    {({ selectedLanguage, getTranslation }) => (
      <div className="karbon">
        <Header
          getTranslation={getTranslation}
          selectedLanguage={selectedLanguage}
        />
        <Intro getTranslation={getTranslation} history={history} />
        <style jsx>{style}</style>
      </div>
    )}
  </LanguageContext.Consumer>
)

export { Karbon }
