import Color from 'color';
import * as React from 'react';
import { uid } from 'react-uid';
import { ThemeContext } from 'styled-components';
import { Box, Heading, Text, Theme } from '..';
import { system } from './system';

export default {
  title: 'Theme',
  component: Theme,
};

export const Simple = () => <Theme>I am wrapped by the Theme component</Theme>;

export const Nested = () => (
  <>
    <Box bg="black" color="white" p="base">
      <code>theme.colors.black = &apos;#000&apos;</code>
      <Theme theme={{ colors: { black: 'rebeccapurple' } }}>
        <Box bg="black" color="white" p="base" mt="base">
          <code>theme.colors.black = &apos;rebeccapurple&apos;</code>
        </Box>
      </Theme>
    </Box>
  </>
);

// export const Breakpoints = () => <>todo Breakpoints</>;

// export const Space = () => <>todo Space</>;

// export const Typography = () => <>todo Typography</>;

const Swatch: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <Box overflow="hidden">
    <Box
      mb="4px"
      height="120px"
      borderRadius="lg"
      style={{ backgroundColor: color }}
      {...(color.toLowerCase() === system.colors.white
        ? {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'gray.100',
          }
        : {})}
    />
    <Box>
      <Heading as="h4" variant="h6" fontWeight={600}>
        {name}
      </Heading>
      <Text>{Color(color).hex().toString()}</Text>
    </Box>
  </Box>
);

const Palette: React.FC<{ color: string }> = ({ color }) => {
  const palette = React.useContext(ThemeContext).colors[color as keyof typeof system.colors];

  return (
    <>
      <Heading as="h3" variant="h3" fontFamily="monospace" mt="24px">
        {color}
      </Heading>
      <Box
        mt={16}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(calc(960px / 4 - 24px), 1fr))"
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
  <Box p="16px">
    <Heading>Colors</Heading>
    <Heading as="h3" variant="h3" mt="24px">
      Neutrals
    </Heading>
    <Box
      mt="16px"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(calc(960px / 4 - 24px), 1fr))"
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
