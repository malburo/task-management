import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    regular1: true;
    regular2: true;
    regular3: true;
    regular4: true;
    regular5: true;
    regular6: true;

    semiBold1: true;
    semiBold2: true;
    semiBold3: true;
    semiBold4: true;
    semiBold5: true;
    semiBold6: true;

    bold1: true;
    bold2: true;
    bold3: true;
    bold4: true;
    bold5: true;
    bold6: true;
  }
}
const themeTypography = {
  typography: {
    regular1: { fontSize: '10px', lineHeight: '12px', fontWeight: 500 },
    regular2: { fontSize: '12px', lineHeight: '16px', fontWeight: 500 },
    regular3: { fontSize: '14px', lineHeight: '22px', fontWeight: 500 },
    regular4: { fontSize: '16px', lineHeight: '24px', fontWeight: 500 },
    regular5: { fontSize: '18px', lineHeight: '26px', fontWeight: 500 },
    regular6: { fontSize: '20px', lineHeight: '28px', fontWeight: 500 },

    semiBold1: { fontSize: '10px', lineHeight: '12px', fontWeight: 600 },
    semiBold2: { fontSize: '12px', lineHeight: '16px', fontWeight: 600 },
    semiBold3: { fontSize: '14px', lineHeight: '22px', fontWeight: 600 },
    semiBold4: { fontSize: '16px', lineHeight: '24px', fontWeight: 600 },
    semiBold5: { fontSize: '18px', lineHeight: '16px', fontWeight: 600 },
    semiBold6: { fontSize: '20px', lineHeight: '28px', fontWeight: 600 },

    bold1: { fontSize: '10px', lineHeight: '12px', fontWeight: 700 },
    bold2: { fontSize: '12px', lineHeight: '16px', fontWeight: 700 },
    bold3: { fontSize: '14px', lineHeight: '22px', fontWeight: 700 },
    bold4: { fontSize: '16px', lineHeight: '24px', fontWeight: 700 },
    bold5: { fontSize: '18px', lineHeight: '26px', fontWeight: 700 },
    bold6: { fontSize: '20px', lineHeight: '28px', fontWeight: 700 },
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
};

const theme = createTheme({
  ...themeTypography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontSize: 12,
          height: 32,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          backgroundColor: '#F2F2F2',
          color: '#828282',
          '&:hover': {
            backgroundColor: '#DFDFDF',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
          backgroundColor: '#2F80ED',
          borderRadius: 6,
          color: 'white',
          '&:hover': {
            backgroundColor: '#2d79e1',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        avatar: {
          border: 'none',
          marginRight: 8,
          marginLeft: 0,
          borderRadius: 6,
          height: 32,
          width: 32,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 32,
          width: 32,
          fontSize: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 20,
          fontSize: 10,
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 12,
          width: 140,
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            marginRight: 12,
            marginLeft: 4,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          borderRadius: '12px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          overflowY: 'visible',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
          boxShadow: `0px 0.2px 0.2px hsl(229deg 15% 79% / 0.14),
          0px 0.4px 0.5px -0.6px hsl(229deg 15% 79% / 0.14),
          0px 0.8px 0.9px -1.2px hsl(229deg 15% 79% / 0.14),
          -0.1px 1.5px 1.7px -1.9px hsl(229deg 15% 79% / 0.14),
          -0.2px 2.8px 3.2px -2.5px hsl(229deg 15% 79% / 0.14)`,
          whiteSpace: 'normal',
          boxSizing: 'border-box',
          '&:hover': {
            opacity: 0.8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 999,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          overflowY: 'unset',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export const lightTheme = deepmerge(
  theme,
  createTheme({
    spacing: 4,
    palette: {
      mode: 'light',
      text: {
        primary: '#272E35',
      },
      primary: {
        main: '#2F80ED',
      },
      secondary: {
        main: '#f7f7f7',
      },
    },
  })
);

export const darkTheme = deepmerge(
  theme,
  createTheme({
    spacing: 4,
    palette: {
      mode: 'dark',
      text: {
        primary: '#fff',
      },
      background: {
        default: '#f51150',
        paper: 'rgb(39 41 52)',
      },
      primary: {
        main: 'rgb(57, 148, 255)',
      },
      secondary: {
        main: 'rgb(39 41 52)',
        dark: 'rgb(39 41 52)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedSecondary: {
            backgroundColor: 'rgb(39 41 52)',
            color: '#ccc',
            '&:hover': {
              backgroundColor: '#22232e',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(rgb(255 255 255 / 5%), rgb(255 255 255 / 5%))',
          },
        },
      },
    },
  })
);

export default lightTheme;
