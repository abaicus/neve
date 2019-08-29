/* jshint esversion: 6 */
import PropTypes from 'prop-types';
import ResponsiveControl from '../common/Responsive.js';
import SizingControl from '../common/Sizing.js';

const { __ } = wp.i18n;
const {
	Component,
	Fragment
} = wp.element;
const {
	ButtonGroup,
	Button,
	Dashicon
} = wp.components;
const {
	mapValues
} = lodash;

class SpacingComponent extends Component {
	constructor(props) {
		super( props );
		let value = props.control.setting.get();
		this.state = {
			value,
			linked: true,
			currentDevice: 'desktop'
		};

		if ( !this.shouldValuesBeLinked() ) {
			this.state.linked = false;
		}

		let defaultParams = {
			min: -300,
			max: 300,
		} 
				
		this.controlParams = props.control.params.input_attrs ? {
			...defaultParams,
			...props.control.params.input_attrs
		} : defaultParams;

	}

	render() {

		let options = [
			{
				'type': 'top',
				'value': this.state.value[this.state.currentDevice]['top']
			},
			{
				'type': 'right',
				'value': this.state.value[this.state.currentDevice]['right']
			},
			{
				'type': 'bottom',
				'value': this.state.value[this.state.currentDevice]['bottom']
			},
			{
				'type': 'left',
				'value': this.state.value[this.state.currentDevice]['left']
			}
		];

		return (
				<Fragment>
					<ResponsiveControl
							controlLabel={this.props.control.params.label}
							onChange={(currentDevice) => {
								this.setState( { currentDevice } );
								this.setState( { linked: this.shouldValuesBeLinked() } );
							}}
					>
						<SizingControl
								min={this.controlParams.min}
								max={this.controlParams.max}
								options={options}
								linked={this.state.linked}
								onLinked={() => this.setState( { linked: !this.state.linked } )}
								onChange={(optionType, numericValue) => {
									this.updateValues( optionType, numericValue );
								}}
						/>
						<div className="neve-units">
							<ButtonGroup className="units">
								{this.getButtons()}
							</ButtonGroup>
							<Button
									isLink
									isDestructive
									onClick={() => {
										let devices = ['mobile', 'desktop', 'tablet'];
										let value = { ...this.state.value };
										devices.map( (device) => {
											value[device] = mapValues( value[device], () => '' );
										} );
										this.setState( { value } );
										this.props.control.setting.set( value );
									}}
									tooltip={__( 'Reset all Values', 'neve' )}
									className="reset">
								<Dashicon icon="image-rotate"/>
							</Button>
						</div>
					</ResponsiveControl>
				</Fragment>
		);
	}

	getButtons() {
		let types = ['px', 'em', '%'],
				buttons = [],
				self = this;
		types.map( function(type) {
			buttons.push(
					<Button
							isDefault
							className={self.state.value[self.state.currentDevice +
							'-unit'] === type ? 'is-active' : ''}
							onClick={() => {
								let value = { ...self.state.value };
								value[self.state.currentDevice + '-unit'] = type;
								self.setState( { value } );
								self.props.control.setting.set( value );
							}}
					>
						{type}
					</Button> );
		} );

		return buttons;
	}

	updateValues(optionType, numericValue) {
		let value = { ...this.state.value };
		numericValue = numericValue === 0 ? 0 : numericValue || '';
		if ( this.state.linked ) {
			value[this.state.currentDevice] = mapValues(
					value[this.state.currentDevice], () => numericValue );
		} else {
			value[this.state.currentDevice] = {
				...value[this.state.currentDevice],
				[optionType]: numericValue
			};
		}

		this.setState( { value } );
		this.props.control.setting.set( value );
	}

	shouldValuesBeLinked() {
		let values = [
			this.state.value[this.state.currentDevice]['top'],
			this.state.value[this.state.currentDevice]['right'],
			this.state.value[this.state.currentDevice]['bottom'],
			this.state.value[this.state.currentDevice]['left']
		];

		return values.every( value => value === values[0] );
	}
}

SpacingComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default SpacingComponent;
