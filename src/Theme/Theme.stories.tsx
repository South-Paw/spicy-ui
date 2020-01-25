import Color from 'color';
import * as React from 'react';
import { uid } from 'react-uid';
import { ThemeContext } from 'styled-components';
import { Box, Heading, Text } from '../';
import { system } from './system';
import Theme from './Theme';

export default {
  title: 'Theme',
  component: Theme,
};

export const Simple = () => <Theme>I am wrapped by the Theme component</Theme>;

export const Nested = () => (
  <>
    <Box bg="black" color="white" p={1}>
      <code>theme.black = '#000'</code>
      <Theme theme={{ colors: { black: 'rebeccapurple' } }}>
        <Box bg="black" color="white" p={1} mt={1}>
          <code>theme.black = 'rebeccapurple'</code>
        </Box>
      </Theme>
    </Box>
  </>
);

// export const Breakpoints = () => <>todo Breakpoints</>;

// export const Space = () => <>todo Space</>;

// export const Typography = () => <>todo Typography</>;

const Swatch: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <Box
    borderRadius="md"
    overflow="hidden"
    backgroundColor="white"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="gray.100"
  >
    <Box height="120px" style={{ backgroundColor: color }} />
    <Box p={1} borderTopWidth="1px" borderTopStyle="solid" borderTopColor="gray.100">
      <Heading as="h4" variant="h6" fontWeight={600}>
        {name}
      </Heading>
      <Text>
        {Color(color)
          .hex()
          .toString()}
      </Text>
    </Box>
  </Box>
);

const Palette: React.FC<{ color: string }> = ({ color }) => {
  const palette = React.useContext(ThemeContext).colors[color as keyof typeof system.colors];

  return (
    <>
      <Heading as="h3" variant="h3" mt={2}>
        <code>{color}</code>
      </Heading>
      <Box
        mt={2}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(calc(960px / 4 - 24px), 1fr))"
        gridGap="24px"
      >
        {Object.keys(palette).map((key, index) => (
          <Swatch key={uid(key, index)} name={key} color={(palette as { [key: string]: string })[key]} />
        ))}
      </Box>
    </>
  );
};

export const Colors = () => (
  <Box p={2}>
    <Heading>Colors</Heading>
    <Heading as="h3" variant="h3" mt={2}>
      Neutrals
    </Heading>
    <Box
      mt={2}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(calc(960px / 4 - 24px), 1fr))"
      gridGap="24px"
    >
      <Swatch name="white" color="#fff" />
      <Swatch name="black" color="#000" />
    </Box>
    {['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'].map((color, index) => (
      <Palette key={uid(color, index)} color={color} />
    ))}
  </Box>
);

// export const Borders = () => <>todo Borders</>;

// export const Shadows = () => <>todo Shadows</>;

// export const zIndices = () => <>todo ZIndices</>;

export const DefaultThemeObject = () => (
  <Box as="pre" m="base" fontSize="xs">
    {JSON.stringify(system, undefined, 2)}
  </Box>
);
