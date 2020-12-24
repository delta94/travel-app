// https://stackoverflow.com/questions/35255645/how-to-set-default-font-family-in-react-native
import React from 'react';
import {
	Text,
	useColorScheme,
} from 'react-native';
import getThemedColors from '../../helpers/Theme';
import {regularFontFamily} from '../../constants/Colors';
export default props => {
	const colors = getThemedColors(useColorScheme())
	return <Text {...props} style={[{fontFamily: regularFontFamily,color: colors.regularText}, props.style]}>{props.children}</Text>
}
