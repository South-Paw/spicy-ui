import * as React from 'react';
import { useComponentStyles } from '../../hooks';
import { SxProps } from '../../system';
import { Box } from '../Box';
import { AvatarProps } from './Avatar';

export interface AvatarGroupProps extends SxProps {
  children?: React.ReactNode;
  /** Border color of all avatars. */
  borderColor?: string;
  /** Maximum number of avatars to show. */
  max?: number;
  /** Size of all avatars. */
  size?: AvatarProps['size'];
  /** Spacing between avatars. */
  spacing?: string;
  /** Variant of all avatars. */
  variant?: AvatarProps['variant'];
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
  const { children, sx, borderColor, max, size, spacing, variant, ...rest } = props;

  const styles = useComponentStyles('Avatar', { ...props, showBorder: true });

  const validChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];

  const visibleChildren = max ? validChildren.slice(0, max) : validChildren;

  const reversedVisible = visibleChildren.reverse();

  const overflow = max != null && validChildren.length - max;

  return (
    <Box ref={ref} display="flex" alignItems="center" justifyContent="flex-end" flexDirection="row-reverse" {...rest}>
      {overflow > 0 && (
        <Box as="span" sx={{ ...styles, ...(borderColor ? { borderColor } : {}) }} ml={spacing}>
          +{overflow}
        </Box>
      )}
      {reversedVisible.map((avatar, index) => {
        const isFirst = index === 0;
        return React.cloneElement(avatar, {
          mr: isFirst ? 0 : spacing,
          size,
          variant,
          sx: { ...(borderColor ? { borderColor } : {}), ...avatar.props.sx },
          showBorder: true,
        });
      })}
    </Box>
  );
});

AvatarGroup.defaultProps = {
  spacing: '-0.75rem',
  variant: 'circle',
  size: 'md',
};

AvatarGroup.displayName = 'AvatarGroup';