import React from 'react'
import PropTypes from 'prop-types'
import 'particles.js/particles'
import style from './style.scss'
import { Particles } from './Helpers'
import './Assets/overlay.png'
import './Assets/azure.png'

const Intro = ({ getTranslation }) => (
  <Particles
    render={() => (
      <div className="intro">
        <div id="particles-js" className="particles-container" />
        <div className="container">
          <div className="banner-content">
            <div className="content content-right">
              <div>
                <h1>{getTranslation('intro.title', true)}</h1>
                <p>{getTranslation('intro.subtitle', true)}</p>
                <p>{getTranslation('intro.airdrop', true)}</p>
              </div>
            </div>
            <div className="content">
              <a rel="noopener noreferrer" href={process.env.AIRDROP_URL}>
                {getTranslation('intro.callToAction')}
              </a>
            </div>
          </div>
        </div>
        <style jsx>{style}</style>
      </div>
    )}
  />
)

Intro.propTypes = {
  getTranslation: PropTypes.func
}

export { Intro }
