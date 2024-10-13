import ClipLoader from 'react-spinners/ClipLoader';
import { useTheme } from '@/providers/ThemeProvider';

// we're overriding the default export of the module to use custom color by default
export default function CustomClipLoader(
  props: React.ComponentProps<typeof ClipLoader>
) {
  const { theme } = useTheme();
  return (
    <ClipLoader
      {...props}
      color={props.color || (theme === 'dark' ? '--muted-foreground' : '')}
    />
  );
}
