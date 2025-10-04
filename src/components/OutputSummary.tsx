import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import EnergyIcon from '@mui/icons-material/Bolt';
import WaterIcon from '@mui/icons-material/WaterDrop';
import TimerIcon from '@mui/icons-material/Timer';
import RecyclingIcon from '@mui/icons-material/Recycling';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface RecyclingResult {
  outputs: Array<{
    productType: string;
    quantity: number;
    unit: string;
    suggestedUses: string[];
  }>;
  resourceUsage: {
    energy: number;
    water: number;
    processingTime: number;
  };
  benefits: string[];
  drawbacks: string[];
  efficiency: number;
  sustainability: number;
}

interface Props {
  results: RecyclingResult;
  onExport: () => void;
}

export const OutputSummary: React.FC<Props> = ({ results, onExport }) => {
  const getEfficiencyColor = (value: number) => {
    if (value >= 90) return '#10B981';
    if (value >= 70) return '#FFF287';
    return '#EF4444';
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 242, 135, 0.1)',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RecyclingIcon sx={{ fontSize: '32px', color: '#10B981' }} />
          <Typography variant="h5" sx={{ color: '#FFF287', fontWeight: 700 }}>
            Recycling Output Summary
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          sx={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFF',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
            },
          }}
        >
          Export Report
        </Button>
      </Box>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RecyclingIcon sx={{ fontSize: '40px', color: '#10B981', mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Recycling Efficiency
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#10B981', fontWeight: 700 }}>
                    {results.efficiency.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={results.efficiency}
                sx={{
                  height: '10px',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${getEfficiencyColor(results.efficiency)} 0%, #10B981 100%)`,
                    borderRadius: '5px',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 242, 135, 0.1) 0%, rgba(200, 63, 18, 0.1) 100%)',
              border: '1px solid rgba(255, 242, 135, 0.3)',
              borderRadius: '12px',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ fontSize: '40px', color: '#FFF287', mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Sustainability Score
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#FFF287', fontWeight: 700 }}>
                    {results.sustainability.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={results.sustainability}
                sx={{
                  height: '10px',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${getEfficiencyColor(results.sustainability)} 0%, #FFF287 100%)`,
                    borderRadius: '5px',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resource Usage Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              borderRadius: '12px',
              textAlign: 'center',
              py: 2,
            }}
          >
            <EnergyIcon sx={{ fontSize: '48px', color: '#FFF287', mb: 1 }} />
            <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700 }}>
              {results.resourceUsage.energy.toFixed(1)} kWh
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Energy Consumption
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              borderRadius: '12px',
              textAlign: 'center',
              py: 2,
            }}
          >
            <WaterIcon sx={{ fontSize: '48px', color: '#3B82F6', mb: 1 }} />
            <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700 }}>
              {results.resourceUsage.water.toFixed(1)} L
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Water Usage
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              borderRadius: '12px',
              textAlign: 'center',
              py: 2,
            }}
          >
            <TimerIcon sx={{ fontSize: '48px', color: '#C83F12', mb: 1 }} />
            <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700 }}>
              {results.resourceUsage.processingTime.toFixed(1)} hrs
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Processing Time
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Output Products */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <RecyclingIcon sx={{ fontSize: '24px', color: '#10B981' }} />
          <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
            Recycled Products
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {results.outputs.map((output, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 700, mb: 1 }}>
                    {output.productType}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
                    {output.quantity.toFixed(1)} {output.unit}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(16, 185, 129, 0.2)', mb: 2 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Suggested Uses:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {output.suggestedUses.map((use, idx) => (
                      <Chip
                        key={idx}
                        label={use}
                        size="small"
                        sx={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#10B981',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          fontSize: '11px',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits and Drawbacks */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '12px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <CheckCircleIcon sx={{ fontSize: '24px', color: '#10B981' }} />
              <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 600 }}>
                Benefits
              </Typography>
            </Box>
            <List>
              {results.benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <CheckCircleIcon sx={{ color: '#10B981', fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={benefit}
                    primaryTypographyProps={{
                      sx: { color: '#FFF', fontSize: '14px' },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <WarningIcon sx={{ fontSize: '24px', color: '#EF4444' }} />
              <Typography variant="h6" sx={{ color: '#EF4444', fontWeight: 600 }}>
                Considerations
              </Typography>
            </Box>
            <List>
              {results.drawbacks.map((drawback, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <WarningIcon sx={{ color: '#EF4444', fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={drawback}
                    primaryTypographyProps={{
                      sx: { color: '#FFF', fontSize: '14px' },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
