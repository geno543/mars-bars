import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WasteEntry {
  id: string;
  materialType: string;
  quantity: number;
  sourceCategory: string;
}

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
  wasteEntries: WasteEntry[];
  results: RecyclingResult;
}

export const WasteVisualization: React.FC<Props> = ({ wasteEntries, results }) => {
  // Aggregate waste by type
  const wasteByType = wasteEntries.reduce((acc, entry) => {
    if (!acc[entry.materialType]) {
      acc[entry.materialType] = 0;
    }
    acc[entry.materialType] += entry.quantity;
    return acc;
  }, {} as Record<string, number>);

  // Chart colors
  const marsColors = [
    '#C83F12',
    '#8A0000',
    '#FFF287',
    '#FF6B35',
    '#F7931E',
    '#FFD700',
    '#FF8C42',
    '#C73E1D',
  ];

  const greenColors = ['#10B981', '#059669', '#047857', '#065F46'];
  const redColors = ['#EF4444', '#DC2626', '#B91C1C'];

  // Waste Input Distribution (Pie Chart)
  const wasteDistributionData = {
    labels: Object.keys(wasteByType),
    datasets: [
      {
        label: 'Waste Quantity (kg)',
        data: Object.values(wasteByType),
        backgroundColor: marsColors,
        borderColor: 'rgba(255, 242, 135, 0.3)',
        borderWidth: 2,
      },
    ],
  };

  // Waste by Source Category (Bar Chart)
  const wasteBySource = wasteEntries.reduce((acc, entry) => {
    if (!acc[entry.sourceCategory]) {
      acc[entry.sourceCategory] = 0;
    }
    acc[entry.sourceCategory] += entry.quantity;
    return acc;
  }, {} as Record<string, number>);

  const sourceBarData = {
    labels: Object.keys(wasteBySource),
    datasets: [
      {
        label: 'Quantity (kg)',
        data: Object.values(wasteBySource),
        backgroundColor: 'rgba(200, 63, 18, 0.8)',
        borderColor: '#FFF287',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Resource Usage Comparison (Bar Chart)
  const resourceData = {
    labels: ['Energy (kWh)', 'Water (L)', 'Time (hours)'],
    datasets: [
      {
        label: 'Resource Consumption',
        data: [
          results.resourceUsage.energy,
          results.resourceUsage.water,
          results.resourceUsage.processingTime,
        ],
        backgroundColor: [
          results.resourceUsage.energy > 100 ? redColors[0] : greenColors[0],
          results.resourceUsage.water > 50 ? redColors[1] : greenColors[1],
          results.resourceUsage.processingTime > 20 ? redColors[2] : greenColors[2],
        ],
        borderColor: '#FFF287',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Output Products (Bar Chart)
  const outputData = {
    labels: results.outputs.map((o) => o.productType),
    datasets: [
      {
        label: 'Output Quantity',
        data: results.outputs.map((o) => o.quantity),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#FFF287',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Efficiency Metrics (Line Chart)
  const efficiencyData = {
    labels: ['Recycling Efficiency', 'Sustainability Score'],
    datasets: [
      {
        label: 'Performance %',
        data: [results.efficiency, results.sustainability],
        fill: true,
        backgroundColor: 'rgba(255, 242, 135, 0.2)',
        borderColor: '#FFF287',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#C83F12',
        pointBorderColor: '#FFF287',
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFF',
          font: { size: 12, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFF287',
        bodyColor: '#FFF',
        borderColor: '#FFF287',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#FFF', font: { size: 11 } },
        grid: { color: 'rgba(255, 242, 135, 0.1)' },
      },
      y: {
        ticks: { color: '#FFF', font: { size: 11 } },
        grid: { color: 'rgba(255, 242, 135, 0.1)' },
      },
    },
  };

  const pieOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#FFF',
          font: { size: 11, weight: 'bold' },
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFF287',
        bodyColor: '#FFF',
        borderColor: '#FFF287',
        borderWidth: 1,
      },
    },
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <AssessmentIcon sx={{ fontSize: '32px', color: '#FFF287' }} />
        <Typography variant="h5" sx={{ color: '#FFF287', fontWeight: 700 }}>
          Data Visualization & Analysis
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Waste Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              height: '400px',
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFF', mb: 2, fontSize: '16px' }}>
              Waste Input Distribution
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Pie data={wasteDistributionData} options={pieOptions} />
            </Box>
          </Box>
        </Grid>

        {/* Source Category Bar Chart */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              height: '400px',
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFF', mb: 2, fontSize: '16px' }}>
              Waste by Source Category
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Bar data={sourceBarData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>

        {/* Resource Usage */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              height: '400px',
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFF', mb: 2, fontSize: '16px' }}>
              Resource Consumption
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Bar data={resourceData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>

        {/* Output Products */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              height: '400px',
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFF', mb: 2, fontSize: '16px' }}>
              Recycled Output Products
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Bar data={outputData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>

        {/* Efficiency Metrics */}
        <Grid item xs={12}>
          <Box
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 242, 135, 0.15)',
              height: '300px',
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFF', mb: 2, fontSize: '16px' }}>
              Performance Metrics
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Line data={efficiencyData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
