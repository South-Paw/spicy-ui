import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import { Input } from '..';

const inputTypes = [
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

const inputSpaces = ['xs', 'sm', 'md', 'lg'];

const inputVariants = ['outlined', 'filled', 'underlined', 'unstyled'];

export default {
  title: 'Input',
  component: Input,
  decorators: [withKnobs],
};

export const Simple = () => (
  <Input
    disabled={boolean('disabled', false)}
    isInvalid={boolean('isInvalid', false)}
    placeholder={text('placeholder', 'Input')}
    readOnly={boolean('readOnly', false)}
    required={boolean('required', false)}
    space={select('space', inputSpaces, 'md')}
    type={select('type', inputTypes, 'text')}
    variant={select('variant', inputVariants, 'outlined')}
    onChange={({ target }) => action('onChange')(target.value)}
  />
);