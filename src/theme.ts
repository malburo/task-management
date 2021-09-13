import { createTheme } from '@material-ui/core/styles';
import React from 'react';

declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    regular1: React.CSSProperties;
    regular2: React.CSSProperties;
    regular3: React.CSSProperties;
    regular4: React.CSSProperties;
    regular5: React.CSSProperties;
    regular6: React.CSSProperties;

    semiBold1: React.CSSProperties;
    semiBold2: React.CSSProperties;
    semiBold3: React.CSSProperties;
    semiBold4: React.CSSProperties;
    semiBold5: React.CSSProperties;
    semiBold6: React.CSSProperties;

    bold1: React.CSSProperties;
    bold2: React.CSSProperties;
    bold3: React.CSSProperties;
    bold4: React.CSSProperties;
    bold5: React.CSSProperties;
    bold6: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    regular1?: React.CSSProperties;
    regular2?: React.CSSProperties;
    regular3?: React.CSSProperties;
    regular4?: React.CSSProperties;
    regular5?: React.CSSProperties;
    regular6?: React.CSSProperties;

    semiBold1?: React.CSSProperties;
    semiBold2?: React.CSSProperties;
    semiBold3?: React.CSSProperties;
    semiBold4?: React.CSSProperties;
    semiBold5?: React.CSSProperties;
    semiBold6?: React.CSSProperties;

    bold1?: React.CSSProperties;
    bold2?: React.CSSProperties;
    bold3?: React.CSSProperties;
    bold4?: React.CSSProperties;
    bold5?: React.CSSProperties;
    bold6?: React.CSSProperties;
  }
}

declare module '@material-ui/core/Typography' {
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

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#2F80ED',
    },
  },
  typography: {
    regular1: {
      fontSize: '10px',
      lineHeight: '12px',
      fontWeight: 500,
    },
    regular2: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
    },
    regular3: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 500,
    },
    regular4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
    },
    regular5: {
      fontSize: '18px',
      lineHeight: '26px',
      fontWeight: 500,
    },
    regular6: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
    },
    semiBold1: {
      fontSize: '10px',
      lineHeight: '12px',
      fontWeight: 600,
    },
    semiBold2: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
    },
    semiBold3: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 600,
    },
    semiBold4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    semiBold5: {
      fontSize: '18px',
      lineHeight: '16px',
      fontWeight: 600,
    },
    semiBold6: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
    },
    bold1: {
      fontSize: '10px',
      lineHeight: '12px',
      fontWeight: 700,
    },
    bold2: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 700,
    },
    bold3: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 700,
    },
    bold4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 700,
    },
    bold5: {
      fontSize: '18px',
      lineHeight: '26px',
      fontWeight: 700,
    },
    bold6: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 700,
    },
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontSize: 12,
          height: 32,
          padding: '8px 20px',
        },
        contained: {
          backgroundColor: '#F2F2F2',
          boxShadow: 'none',
          color: '#828282',
          '&:hover': {
            backgroundColor: '#dfdfdf',
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#2F80ED',
          color: 'white',
          '&:hover': {
            backgroundColor: '#2d79e1',
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
          borderRadius: 8,
          color: 'white',
          '&:hover': {
            backgroundColor: '#2d79e1',
          },
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        avatar: {
          border: 'none',
          marginRight: 4,
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
          borderRadius: 10,
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.05)',
          zIndex: 1201,
          padding: '0px 12px',
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
          color: '#4F4F4F',
          '&:hover': {
            backgroundColor: '#F2F2F2',
          },
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
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
