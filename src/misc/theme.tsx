import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#E7EBD1',
			contrastText: '#000000'
			// main: '#DDAD62'
		},
		secondary: {
			main: '#DDAD62',
			contrastText: '#000000'
			// main: '#E7EBD1'
		},
		background: {
			default: '#B5AF8F'
		}
	},
	typography: {
		h1: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		},
		h2: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		},
		h3: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		},
		h4: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		},
		h5: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		},
		h6: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
			// textShadow: '1px 1px 1px #000000'
		}
	}
});
