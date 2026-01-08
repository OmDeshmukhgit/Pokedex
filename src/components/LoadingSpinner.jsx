import { Box, Typography } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        gap: 3
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '3px solid #333',
          position: 'relative',
          background: 'linear-gradient(to bottom, #ee1515 50%, white 50%)',
          animation: 'spin 1.2s infinite ease-in-out, bounce 0.8s infinite alternate',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 60,
            height: 4,
            background: '#333',
            top: '50%',
            transform: 'translateY(-50%)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 15,
            height: 15,
            background: 'white',
            border: '3px solid #333',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          '@keyframes bounce': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-10px)' },
          }
        }}
      />

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: 2,
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 },
            }
          }}
        >
          Catching &apos;em all...
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            display: 'block',
            mt: 1
          }}
        >
          &quot;I choose you!&quot;
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingSpinner;

