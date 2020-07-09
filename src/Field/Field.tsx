import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text, TextProps } from '../Text';
import { baseStyle, withColorMode } from '../util';
import { FieldContext } from './Context';

const FieldLabel = styled(Text)`
  ${withColorMode(baseStyle('components.FieldLabel'))}
`;

const FieldRequired = styled('span')`
  ${withColorMode(baseStyle('components.FieldRequired'))}
`;

const FieldControl = styled('div')`
  ${withColorMode(baseStyle('components.FieldControl'))}
`;

const FieldHelperText = styled(Text).withConfig<{ isInvalid?: boolean } & TextProps>({
  shouldForwardProp: createShouldForwardProp([...props, 'isInvalid']),
})`
  ${withColorMode(baseStyle('components.FieldHelperText'))}
`;

interface HelperTextProps {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
  isInvalid?: boolean;
}

const HelperText: React.FC<HelperTextProps> = ({ errorText, helperText, isInvalid }) => {
  if (errorText || helperText) {
    if (isInvalid) {
      return (
        <FieldHelperText as="div" isInvalid>
          {errorText || helperText}
        </FieldHelperText>
      );
    }

    if (helperText) {
      return <FieldHelperText as="div">{helperText}</FieldHelperText>;
    }
  }

  return null;
};

export interface FieldProps {
  /** Text to display when the field is invalid. */
  errorText?: React.ReactNode;
  /** Text to display with the control. */
  helperText?: React.ReactNode;
  /** Unique ID of the field. */
  id: string;
  /** Set to `true` to disable the field's control. */
  isDisabled?: boolean;
  /** Set to `true` to mark the field as invalid. */
  isInvalid?: boolean;
  /** Set to `true` to mark the control as readonly. */
  isReadOnly?: boolean;
  /** Set to `true` to mark the control as required. */
  isRequired?: boolean;
  /** Label of the control. */
  label?: string;
}

const Field: React.FC<FieldProps> = ({
  children,
  errorText,
  helperText,
  id,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  label,
}) => (
  <FieldContext.Provider value={{ id, isDisabled, isInvalid, isReadOnly, isRequired }}>
    <Box>
      {label && (
        <Box mb="1">
          <FieldLabel as="label" htmlFor={id}>
            {label}
            {isRequired && <FieldRequired as="span">*</FieldRequired>}
          </FieldLabel>
        </Box>
      )}
      <FieldControl>{children}</FieldControl>
      <HelperText errorText={errorText} helperText={helperText} isInvalid={isInvalid} />
    </Box>
  </FieldContext.Provider>
);

Field.displayName = 'Field';

export { Field };
