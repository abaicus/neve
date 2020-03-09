import PropTypes from 'prop-types'
import SizingControl from '../common/Sizing.js'
import SVG from '../common/svg.js'
import classnames from 'classnames'
import ResponsiveControl from '../common/Responsive.js'

const { __ } = wp.i18n
const {
  Button
} = wp.components
const { Component } = wp.element

class NumberControl extends Component {
  constructor(props) {
    super( props )
  }

  render() {
    const { label, units, value, className, hasResponsive } = this.props
    return (
      <div className={className + ' neve-number-control-wrap'}>
		<div className='neve-control-header'>
		  {label && <span className='customize-control-title'>{label}</span>}
		  {hasResponsive && <ResponsiveControl
			onChange={(currentDevice) => this.props.onChangedDevice( currentDevice )}/>}
		  {units && <div className='neve-units'>{this.getButtons()}</div>}
		</div>
        <SizingControl
          noLinking
          noRange
          options={[{ value: value }]}
          onChange={(type, value) => {
            this.props.onChange( value )
          }}
          max={this.props.max || 100}
          min={this.props.min || 0}
          step={this.props.step || 1}
          defaults={this.props.default}
          onReset={() => {
            this.props.onReset()
          }}
        />
      </div>
    )
  }

  getButtons() {
    const self = this
    const svg = {
      px: SVG.px,
      em: SVG.em
    }
    const { units } = this.props
    if ( !units ) return ''
    if ( units.length === 1 ) {
      return ( <Button
        className='is-active is-single'
        isSmall
        disabled
               >{units[0]}
      </Button> )
    }
    return units.map( (unit, index) => {
      const buttonClass = classnames( {
        active: self.props.activeUnit === unit
      } )
      return ( <Button
        key={index}
        isSmall
        onClick={() => {
          self.props.onUnitChange( unit )
        }}
        className={buttonClass}
      >
        {unit}
               </Button> )
    } )
  }
}

NumberControl.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  units: PropTypes.array || PropTypes.bool,
  onUnitChange: PropTypes.func,
  activeUnit: PropTypes.string,
  default: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  hasResponsive: PropTypes.bool,
  onChangedDevice: PropTypes.func
}

export default NumberControl
