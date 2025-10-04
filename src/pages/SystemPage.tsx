import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ScienceIcon from '@mui/icons-material/Science';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { WasteVisualization } from '../components/WasteVisualization';
import { OutputSummary } from '../components/OutputSummary';

interface WasteEntry {
  id: string;
  materialType: string;
  quantity: number;
  sourceCategory: string;
  description?: string;
  contamination?: string;
  moistureLevel?: string;
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

const wasteTypes = [
  'Aluminum',
  'Polymer Composites',
  'Foam Packaging',
  'Fabrics',
  'EVA Waste',
  'Plastics (PET)',
  'Plastics (HDPE)',
  'Plastics (PP)',
  'Glass Fiber',
  'Carbon Fiber',
  'Food Waste',
  'Paper/Cardboard',
  'Electronics',
  'Metal Alloys',
];

const sourceCategories = [
  'Residence Renovations',
  'Cosmic Celebrations',
  'Daring Discoveries',
  'Life Support Systems',
  'Research Equipment',
];

const SystemPage: React.FC = () => {
  const navigate = useNavigate();
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([
    {
      id: '1',
      materialType: '',
      quantity: 0,
      sourceCategory: '',
    },
  ]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<RecyclingResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [resultsCache, setResultsCache] = useState<Map<string, RecyclingResult>>(new Map());

  const addWasteEntry = () => {
    setWasteEntries([
      ...wasteEntries,
      {
        id: Date.now().toString(),
        materialType: '',
        quantity: 0,
        sourceCategory: '',
      },
    ]);
  };

  const removeWasteEntry = (id: string) => {
    if (wasteEntries.length > 1) {
      setWasteEntries(wasteEntries.filter((entry) => entry.id !== id));
    }
  };

  const updateWasteEntry = (id: string, field: keyof WasteEntry, value: any) => {
    setWasteEntries(
      wasteEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const processWaste = async () => {
    setProcessing(true);
    setShowResults(false);

    try {
      const totalQuantity = wasteEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      
      // Create a cache key from waste entries for consistent results
      const cacheKey = JSON.stringify(
        wasteEntries
          .map(e => ({ 
            type: e.materialType, 
            qty: e.quantity, 
            src: e.sourceCategory,
            desc: e.description || '',
            cont: e.contamination || ''
          }))
          .sort((a, b) => a.type.localeCompare(b.type))
      );

      // Check cache first for consistent results
      console.log('🔍 Checking cache... Current cache size:', resultsCache.size);
      console.log('🔍 Cache key for this request:', cacheKey.substring(0, 100) + '...');
      
      if (resultsCache.has(cacheKey)) {
        console.log('✅ FOUND IN CACHE - Using cached results (NO API CALL MADE)');
        console.log('💡 TIP: Change any input value to force a new API call');
        setResults(resultsCache.get(cacheKey)!);
        setProcessing(false);
        setShowResults(true);
        return;
      }
      
      console.log('🔄 NOT IN CACHE - Will make NEW API request...');
      console.log('📊 Current cache has', resultsCache.size, 'entries');
      
      // Prepare waste data for AI analysis (including description for context)
      const wasteData = wasteEntries.map(entry => {
        let entryStr = `${entry.materialType}: ${entry.quantity}kg from ${entry.sourceCategory}`;
        if (entry.contamination) entryStr += ` (${entry.contamination}% contamination)`;
        if (entry.description) entryStr += ` - Notes: ${entry.description}`;
        return entryStr;
      }).join('; ');

      console.log('🚀 Calling Hack Club AI API for waste analysis...');
      console.log('📊 Waste Data:', wasteData);
      console.log('🔑 Cache Key:', cacheKey);
      console.log('⏳ Sending request to Hack Club AI...');
      console.log('🌐 API Endpoint: https://ai.hackclub.com/chat/completions');
      console.log('🤖 Model: openai/gpt-oss-120b (FREE, NO AUTH NEEDED)');
      
      // Call Hack Club AI API - FREE, NO API KEY NEEDED!
      console.log('📤 Making axios POST request...');
      const response = await axios.post(
        'https://ai.hackclub.com/chat/completions',
        {
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Mars waste recycling AI. Analyze waste materials and return ONLY valid JSON (no markdown, no explanations). Be realistic about efficiency based on material quality, contamination, and Mars constraints. Consider material condition from descriptions - pristine materials have higher efficiency (90-95%), contaminated materials lower (70-80%). Vary your recommendations significantly based on input differences.'
            },
            {
              role: 'user',
              content: `You must analyze this Mars waste and return ONLY valid JSON.

WASTE INPUT (Total: ${totalQuantity}kg):
${wasteData}

CRITICAL INSTRUCTIONS:
- If description mentions "clean", "high-grade", or "pristine": Use 88-95% efficiency
- If description mentions "contaminated", "damaged", or "low quality": Use 70-82% efficiency  
- No description: Use 82-88% efficiency (moderate quality)
- Vary outputs significantly based on material type and condition
- Consider Mars limitations: scarce water, solar power only, closed-loop systems

Return ONLY this JSON structure (NO code blocks, NO explanations):
{
  "outputs": [
    {"productType": "string", "quantity": number, "unit": "kg" or "units", "suggestedUses": ["use1", "use2", "use3"]}
  ],
  "resourceUsage": {"energy": number, "water": number, "processingTime": number},
  "benefits": ["benefit1", "benefit2", "benefit3", "benefit4"],
  "drawbacks": ["drawback1", "drawback2", "drawback3"],
  "efficiency": number (70-95),
  "sustainability": number (75-98)
}

Consider Mars constraints: limited water, solar energy, closed-loop systems, material conditions.`
            }
          ]
        }
      );

      console.log('✅ OpenRouter API Response received!');
      console.log('� Response status:', response.status);
      console.log('� Token usage:', response.data.usage);
      
      // Parse AI response
      if (!response.data || !response.data.choices || !response.data.choices[0]) {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Invalid API response structure');
      }
      
      const aiContent = response.data.choices[0].message.content;
      console.log('🤖 AI Generated Content:');
      console.log(aiContent);
      
      let aiResults;
      
      try {
        // Clean the response - remove markdown code blocks if present
        let cleanedContent = aiContent.trim();
        cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        // Try to parse JSON from the response
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiResults = JSON.parse(jsonMatch[0]);
          console.log('✅ Successfully parsed AI JSON');
          
          // Validate the structure
          if (!aiResults.outputs || !aiResults.resourceUsage || !aiResults.benefits || !aiResults.drawbacks) {
            throw new Error('Invalid AI response structure - missing required fields');
          }
          
          console.log('✅ AI response validated - all fields present');
          console.log('💾 Caching results...');
          
          // Cache the results
          const newCache = new Map(resultsCache);
          newCache.set(cacheKey, aiResults);
          setResultsCache(newCache);
          
          console.log('✅ Results cached successfully!');
          
        } else {
          throw new Error('No JSON found in AI response');
        }
      } catch (parseError) {
        console.error('❌ Failed to parse AI response:', parseError);
        console.error('📄 Raw content:', aiContent);
        console.warn('⚠️ Using fallback algorithm');
        
        // Fallback to deterministic results based on waste input
        aiResults = generateDeterministicResults(totalQuantity, wasteEntries);
        
        console.log('🔄 Generated fallback results');
        
        // Cache fallback results too
        const newCache = new Map(resultsCache);
        newCache.set(cacheKey, aiResults);
        setResultsCache(newCache);
      }

      setResults(aiResults);
      setProcessing(false);
      setShowResults(true);
    } catch (error) {
      console.error('❌ AI Processing Error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('🔴 API Error Details:');
        console.error('  - Status:', error.response?.status);
        console.error('  - Message:', error.message);
        console.error('  - Data:', error.response?.data);
        
        // Check for specific error types
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.error('❌ Network error - check internet connection');
          console.error('👉 Make sure you have internet access');
        } else if (error.response?.status === 401) {
          console.error('❌ Authentication failed (Hack Club AI should not require auth)');
        } else if (error.response?.status === 404) {
          console.error('❌ 404 - Hack Club AI endpoint not found');
        } else if (error.response?.status === 429) {
          console.error('⚠️ Rate limit exceeded on Hack Club AI');
        } else if (error.response?.status === 503) {
          console.error('⚠️ Hack Club AI service temporarily unavailable');
        }
      } else {
        console.error('Non-Axios Error:', error);
      }
      
      console.warn('⚠️ Using fallback deterministic results');
      
      // Fallback to deterministic results on error
      const totalQuantity = wasteEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      const fallbackResults = generateDeterministicResults(totalQuantity, wasteEntries);
      
      setResults(fallbackResults);
      setProcessing(false);
      setShowResults(true);
    }
  };

  const generateDeterministicResults = (totalQuantity: number, entries: WasteEntry[]): RecyclingResult => {
    // Analyze waste composition for deterministic output
    const hasPlastics = entries.some(e => e.materialType.toLowerCase().includes('plastic'));
    const hasMetals = entries.some(e => e.materialType.toLowerCase().includes('aluminum') || e.materialType.toLowerCase().includes('metal'));
    const hasFabrics = entries.some(e => e.materialType.toLowerCase().includes('fabric'));
    const hasEVA = entries.some(e => e.materialType.toLowerCase().includes('eva'));
    
    // Calculate deterministic efficiency based on material types (no random)
    const materialDiversity = new Set(entries.map(e => e.materialType)).size;
    const baseEfficiency = 85;
    const diversityBonus = Math.min(materialDiversity * 2, 10);
    const efficiency = baseEfficiency + diversityBonus;
    
    const sustainability = 90 + Math.min(materialDiversity * 1.5, 8);
    
    // Deterministic resource calculations
    const energyFactor = hasMetals ? 2.8 : 2.2;
    const waterFactor = hasPlastics ? 0.7 : 0.5;
    
    return {
      outputs: [
        {
          productType: hasPlastics ? '3D Printing Filament (PET/HDPE)' : hasFabrics ? 'Composite Material' : 'Construction Aggregate',
          quantity: parseFloat((totalQuantity * 0.6).toFixed(2)),
          unit: 'kg',
          suggestedUses: ['Tool handles', 'Replacement parts', 'Storage containers'],
        },
        {
          productType: hasMetals ? 'Structural Components (Aluminum Alloy)' : hasEVA ? 'Insulation Padding' : 'Building Blocks',
          quantity: parseFloat((totalQuantity * 0.28).toFixed(2)),
          unit: 'units',
          suggestedUses: ['Habitat reinforcement', 'Equipment mounts', 'Radiation shielding'],
        },
        {
          productType: 'Recycled Feedstock',
          quantity: parseFloat((totalQuantity * 0.07).toFixed(2)),
          unit: 'kg',
          suggestedUses: ['Chemical processing', 'Fuel synthesis', 'Raw material storage'],
        },
      ],
      resourceUsage: {
        energy: parseFloat((totalQuantity * energyFactor).toFixed(2)),
        water: parseFloat((totalQuantity * waterFactor).toFixed(2)),
        processingTime: parseFloat((totalQuantity * 0.45).toFixed(2)),
      },
      benefits: [
        `Reduces waste accumulation by ${(totalQuantity * 0.95).toFixed(1)} kg`,
        `Achieves ${efficiency.toFixed(1)}% material circularity in habitat systems`,
        'Decreases dependency on Earth resupply missions by 38%',
        'Creates valuable construction and manufacturing materials',
        'Supports closed-loop life support system sustainability',
      ],
      drawbacks: [
        `Energy requirement: ${(totalQuantity * energyFactor).toFixed(1)} kWh from solar/nuclear sources`,
        `Residual waste: ${(totalQuantity * 0.05).toFixed(2)} kg requires disposal`,
        `Processing time: ${(totalQuantity * 0.45).toFixed(1)} hours automated processing`,
      ],
      efficiency: parseFloat(efficiency.toFixed(2)),
      sustainability: parseFloat(sustainability.toFixed(2)),
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock CSV parsing
      console.log('File uploaded:', file.name);
      setUploadDialogOpen(false);
      // In production, parse CSV and populate wasteEntries
    }
  };

  const exportReport = () => {
    if (!results) return;
    
    const reportData = {
      timestamp: new Date().toISOString(),
      wasteInputs: wasteEntries,
      results: results,
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mars-recycling-report-${Date.now()}.json`;
    a.click();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1e3e 50%, #2a1e3e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Martian Background Texture */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C83F12\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'fixed',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: '#FFF287',
            opacity: 0.3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Tooltip title="Back to Home" arrow>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(200, 63, 18, 0.2)',
                  borderColor: '#C83F12',
                  color: '#FFF',
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box
              sx={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 60px rgba(200, 63, 18, 0.6), 0 0 0 1px rgba(255, 242, 135, 0.2)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFF287, #C83F12)',
                  opacity: 0.3,
                  filter: 'blur(8px)',
                  zIndex: -1,
                },
              }}
            >
              <RecyclingIcon sx={{ fontSize: '60px', color: '#FFF287' }} />
            </Box>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '2.8rem', md: '4rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Mars Waste Recycling System
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              maxWidth: '900px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Advanced AI-powered waste management for sustainable Mars habitat operations
          </Typography>
        </Box>

        {/* Waste Data Input Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 5 },
            mb: 5,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 242, 135, 0.2)',
            borderRadius: '28px',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 242, 135, 0.5), transparent)',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box
                sx={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(255, 242, 135, 0.15) 0%, rgba(200, 63, 18, 0.15) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 242, 135, 0.3)',
                }}
              >
                <AssessmentIcon sx={{ fontSize: '28px', color: '#FFF287' }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700, mb: 0.5 }}>
                  Waste Data Input
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                  Enter waste materials for AI-powered recycling analysis
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{
                borderColor: 'rgba(255, 242, 135, 0.4)',
                color: '#FFF',
                borderWidth: '1.5px',
                px: 3,
                py: 1.3,
                fontWeight: 600,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#FFF287',
                  borderWidth: '1.5px',
                  background: 'rgba(255, 242, 135, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(255, 242, 135, 0.25)',
                },
              }}
            >
              Import CSV
            </Button>
          </Box>

          {wasteEntries.map((entry, index) => (
            <Paper
              key={entry.id}
              elevation={0}
              sx={{
                p: 3.5,
                mb: 3,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 242, 135, 0.15)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: `"${index + 1}"`,
                  position: 'absolute',
                  top: '-12px',
                  left: '24px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C83F12, #8A0000)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFF',
                  border: '2px solid rgba(10, 14, 39, 1)',
                  boxShadow: '0 4px 12px rgba(200, 63, 18, 0.4)',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  boxShadow: '0 12px 40px rgba(200, 63, 18, 0.35)',
                  transform: 'translateY(-4px)',
                  borderColor: 'rgba(255, 242, 135, 0.35)',
                },
              }}
            >
              <Grid container spacing={2.5}>
                {/* Row 1: Main Fields */}
                <Grid item xs={12} md={3.5}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Material Type *
                    </InputLabel>
                    <Select
                      value={entry.materialType}
                      onChange={(e) =>
                        updateWasteEntry(entry.id, 'materialType', e.target.value)
                      }
                      label="Material Type *"
                      sx={{
                        color: '#FFF',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 242, 135, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 242, 135, 0.4)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C83F12',
                        },
                      }}
                    >
                      {wasteTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity (kg) *"
                    value={entry.quantity || ''}
                    onChange={(e) =>
                      updateWasteEntry(entry.id, 'quantity', parseFloat(e.target.value) || 0)
                    }
                    InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFF',
                        '& fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#C83F12',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3.5}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Source Category *
                    </InputLabel>
                    <Select
                      value={entry.sourceCategory}
                      onChange={(e) =>
                        updateWasteEntry(entry.id, 'sourceCategory', e.target.value)
                      }
                      label="Source Category *"
                      sx={{
                        color: '#FFF',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 242, 135, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 242, 135, 0.4)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C83F12',
                        },
                      }}
                    >
                      {sourceCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Contamination %"
                    type="number"
                    placeholder="Optional"
                    value={entry.contamination || ''}
                    onChange={(e) =>
                      updateWasteEntry(entry.id, 'contamination', e.target.value)
                    }
                    InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFF',
                        '& fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.15)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#C83F12',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={1}>
                  <IconButton
                    onClick={() => removeWasteEntry(entry.id)}
                    disabled={wasteEntries.length === 1}
                    sx={{
                      color: wasteEntries.length === 1 ? 'rgba(255, 255, 255, 0.3)' : '#EF4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      width: '100%',
                      height: '56px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: wasteEntries.length === 1 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.2)',
                        transform: wasteEntries.length === 1 ? 'none' : 'scale(1.05)',
                      },
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>

                {/* Row 2: Description Field (Full Width) */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description (Optional)"
                    placeholder="Add any additional notes about this material..."
                    value={entry.description || ''}
                    onChange={(e) =>
                      updateWasteEntry(entry.id, 'description', e.target.value)
                    }
                    InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFF',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        '& fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.15)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 242, 135, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#C83F12',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4, pt: 3, borderTop: '1px solid rgba(255, 242, 135, 0.1)' }}>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={addWasteEntry}
              sx={{
                borderColor: 'rgba(255, 242, 135, 0.4)',
                color: '#FFF',
                borderRadius: '14px',
                px: 4,
                py: 1.6,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                borderWidth: '1.5px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(255, 242, 135, 0.1)',
                  transform: 'translateY(-2px)',
                  borderColor: '#FFF287',
                  borderWidth: '1.5px',
                  boxShadow: '0 8px 24px rgba(255, 242, 135, 0.3)',
                },
              }}
            >
              Add Material Entry
            </Button>

            <Button
              variant="contained"
              startIcon={processing ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : <ScienceIcon />}
              onClick={processWaste}
              disabled={processing || wasteEntries.some(e => !e.materialType || e.quantity <= 0)}
              sx={{
                background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                color: '#FFF',
                borderRadius: '14px',
                px: 6,
                py: 1.6,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 6px 20px rgba(200, 63, 18, 0.5)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #E04818 0%, #A81000 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 32px rgba(200, 63, 18, 0.7)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  boxShadow: 'none',
                },
              }}
            >
              {processing ? 'Processing Analysis' : 'Start AI Analysis'}
            </Button>
          </Box>
        </Paper>

        {/* Processing Indicator */}
        {processing && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              mb: 5,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 242, 135, 0.2)',
              borderRadius: '28px',
              boxShadow: '0 12px 48px rgba(200, 63, 18, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 242, 135, 0.1), transparent)',
                animation: 'shimmer 2s infinite',
              },
              '@keyframes shimmer': {
                '0%': { left: '-100%' },
                '100%': { left: '100%' },
              },
            }}
          >
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255, 242, 135, 0.2) 0%, rgba(200, 63, 18, 0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 242, 135, 0.4)',
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: '36px', color: '#FFF287' }} />
                </Box>
                <CircularProgress 
                  size={64} 
                  thickness={3}
                  sx={{ 
                    color: '#C83F12',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }} 
                />
              </Box>
              <Typography variant="h5" sx={{ color: '#FFF', mb: 1.5, fontWeight: 700, letterSpacing: '-0.01em' }}>
                AI Analysis in Progress
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4, fontSize: '1.05rem' }}>
                Processing waste composition with advanced machine learning models
              </Typography>
              <LinearProgress
                sx={{
                  height: '6px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  maxWidth: '400px',
                  mx: 'auto',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #C83F12 0%, #FFF287 100%)',
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>
          </Paper>
        )}



        {/* Results Section */}
        {showResults && results && (
          <>
            {/* Data Visualization */}
            <WasteVisualization 
              wasteEntries={wasteEntries}
              results={results}
            />

            {/* Output Summary */}
            <OutputSummary 
              results={results}
              onExport={exportReport}
            />
          </>
        )}
      </Container>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1e3e 0%, #2a1e3e 100%)',
            border: '1px solid rgba(255, 242, 135, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF287' }}>Upload Waste Data (CSV)</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            Upload a CSV file with columns: Material Type, Quantity, Source Category
          </Typography>
          <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<CloudUploadIcon />}
            sx={{
              background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
              },
            }}
          >
            Choose File
            <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)} sx={{ color: '#FFF287' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemPage;
