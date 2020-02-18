import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ToolbarWrapper, { toolbarWrapperPropTypes } from '@components/toolbar/ToolbarWrapper';
import defaultOptions from '@components/toolbar/defaultOptions';

const ToolbarComponent = ({ functions, formats, ...props }) => {

	// toolbar screen state
	const [screen, setScreen] = useState(null);

	// props to pass toolbar api children / functions
	const renderProps = { functions, formats, setScreen, screen }

	// should editor be displayed
	let isOpen = props.isOpen(renderProps);
	if (isOpen === null) isOpen = formats.isCollapsed === false;

	// grab the default / current screen from configuration
	const defaultScreen = get(props, 'defaultScreen', 'default');

	// is user forcing the render of a certain screen
	const forceScreen = get(props, 'forceScreen');
	const forcedScreen = typeof forceScreen === 'function'
		? forceScreen(renderProps)
		: null;

	// get current screen, fall back to default screen if
	// invalid screen is provided, or no screen is forced
	const screens = get(props, 'screens') || {};
	const currentScreen = screens[forcedScreen] || screens[screen] || screens[defaultScreen];
	if (!currentScreen || !Array.isArray(currentScreen)) return null;

	return (
	  <ToolbarWrapper
	  	isOpen={isOpen}
	  	inline={props.inline}
	  	style={props.style}
	  	className={props.className}
	  >
	    {currentScreen.map(ScreenItem => (
	    	<ScreenItem {...renderProps} />
	    ))}
	  </ToolbarWrapper>
	)
};

export const toolbarPropTypes = {

	// inline styles to wrapper
	style: PropTypes.object,

	// custom class name
	className: PropTypes.string,

	// make this an inline toolbar
	inline: PropTypes.bool,

	// function receives the toolbar component props 
	// as argument. return true / false to toggle the
	// visibility state of the toolbar. this will show
	// or hide the toolbar on inline mode, and only
	// toggle the class names for embedded mode.
	isOpen: PropTypes.func,

	// configuration of screens, their layouts
	screens: PropTypes.object,

	// default screen id to render
	defaultScreen: PropTypes.string,

	// function receives the toolbar component props 
	// as argument. return a screen to force render
	// it despite the active screen state.
	// return null or omit to not force a screen.
	forceScreen: PropTypes.func,
}

ToolbarComponent.propTypes = {
	
	...toolbarPropTypes,

	// formats object
	formats: PropTypes.object,

	// functions object
	functions: PropTypes.object.isRequired,
};

ToolbarComponent.defaultProps = defaultOptions;

export default ToolbarComponent;
