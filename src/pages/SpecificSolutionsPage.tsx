import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MaterialData {
  inputMaterial: string;
  inputDescription: string;
  outputProduct: string;
  outputDescription: string;
  sustainability: number;
  rationale: string;
  source: string;
}

const materialsData: MaterialData[] = [
  {
    inputMaterial: 'Uline Air Pillow Film',
    inputDescription: 'Thin, lightweight packaging made of medium- to high-density polyethylene (MDPE/HDPE), designed to trap air in sealed pockets for protective cushioning.',
    outputProduct: 'Insulation blankets',
    outputDescription: 'Use trapped air chambers to provide lightweight thermal insulation and reduce conductive heat transfer in habitats.',
    sustainability: 88,
    rationale: 'Reused with low-energy mechanical processing. Useful for habitat insulation on Mars.',
    source: 'NASA Glenn Research Center — Advanced Materials for Space Structures (2020)',
  },
  {
    inputMaterial: 'Aluminum Steam Table Pans',
    inputDescription: 'Lightweight, disposable containers made from thin-gauge aluminum foil.',
    outputProduct: 'Reflective heat shields',
    outputDescription: "Aluminum's high infrared reflectivity and thermal conductivity protects habitats and rovers by deflecting radiant heat.",
    sustainability: 92,
    rationale: 'Aluminum re-melted with low loss.',
    source: 'The Aluminum Association – Recycling Facts (2021)',
  },
  {
    inputMaterial: 'Anti-static Bubble Bags',
    inputDescription: 'Low-density polyethylene film embedded with antistatic agents for cushioning electronic components and dissipating static charges.',
    outputProduct: 'Padded tool wraps',
    outputDescription: 'Provide mechanical shock absorption and reduce electrostatic buildup protecting sensitive instruments.',
    sustainability: 75,
    rationale: 'Reused LDPE bubble bags.',
    source: 'EPA – Plastics Recycling Facts (2020)',
  },
  {
    inputMaterial: 'Carbon Fiber Sheet + Epoxy Resin',
    inputDescription: 'Composite of high-strength carbon fibers embedded in epoxy matrix, non-remeltable.',
    outputProduct: 'Tool handles & repair patches',
    outputDescription: 'Mechanically reshaped for repairs; strong adhesive bonding but requires handling safety precautions.',
    sustainability: 40,
    rationale: 'Epoxy cannot be remelted; mechanical reuse only.',
    source: 'ScienceDirect – Recycling of CFRP Composites (2022)',
  },
  {
    inputMaterial: 'CEL Kynar Gas Sampling Bags',
    inputDescription: 'Flexible polyvinylidene fluoride (PVDF) fluoropolymer bags with excellent gas barrier and chemical resistance.',
    outputProduct: 'Flexible containment bladders',
    outputDescription: 'Used for safe storage and transport of fluids or gases under variable conditions.',
    sustainability: 65,
    rationale: 'PVDF durable; moderately recyclable.',
    source: 'Arkema – PVDF Technical Recycling Data (2021)',
  },
  {
    inputMaterial: 'Mixed Cotton Clothing',
    inputDescription: 'Textile blend of natural cotton and synthetic polymers like polyester, durable and breathable.',
    outputProduct: 'Patch kits',
    outputDescription: 'Fabric reinforcements for clothing and equipment, extending their life.',
    sustainability: 85,
    rationale: 'Cotton reused with low processing.',
    source: 'Textile Recycling Association Report (2020)',
  },
  {
    inputMaterial: 'Glenroy White Ready Seal 225',
    inputDescription: 'Multi-layer flexible film with PET, LDPE, Surlyn sealant providing high barrier and sealing.',
    outputProduct: 'Lightproof pouches',
    outputDescription: 'Protect samples and food from light exposure and contamination.',
    sustainability: 60,
    rationale: 'Multi-layer film reused, moderate sustainability.',
    source: 'Flexible Packaging Association (2021)',
  },
  {
    inputMaterial: 'Magid NOM10 White Hood',
    inputDescription: 'Flame-resistant aramid Nomex fiber with thermal stability and high strength.',
    outputProduct: 'Heat-shield patches & filter pre-covers',
    outputDescription: 'Flame-resistant, thermally stable fabric patches and pre-filters protecting habitat and equipment.',
    sustainability: 78,
    rationale: 'Durable, flame-resistant Nomex reused for protective patches.',
    source: 'DuPont – Nomex Technical Guide (2020)',
  },
  {
    inputMaterial: 'Nitrile Gloves',
    inputDescription: 'Disposable synthetic rubber gloves (NBR) with puncture and chemical resistance, hypoallergenic.',
    outputProduct: '3D-printable pallets/filaments',
    outputDescription: 'Processed into 3D-printable feeds after devulcanization for extrusion-grade materials.',
    sustainability: 58,
    rationale: 'Challenging to recycle but grindable to feedstock.',
    source: 'Scientific Reports – Recycling Nitrile Gloves (2023)',
  },
  {
    inputMaterial: 'Mixed Cotton Clothing (Thermal insulation)',
    inputDescription: 'Cotton/polyester blend used for insulation panels and spacesuit layers.',
    outputProduct: 'Thermal insulation panels & suits',
    outputDescription: 'Panels and layers with high sustainability and insulation properties for Mars habitats.',
    sustainability: 85,
    rationale: 'Highly sustainable insulation and spacesuit layers.',
    source: 'Journal of Industrial Textiles – Cotton Fiber Recycling (2021)',
  },
  {
    inputMaterial: 'Mixed Cotton Clothing (Biochar)',
    inputDescription: 'Cotton textiles pyrolyzed in oxygen-limited conditions to produce biochar.',
    outputProduct: 'Biochar',
    outputDescription: 'Biochar used for filtration and soil amendment applications on Mars.',
    sustainability: 80,
    rationale: 'Pyrolyzed cotton transforms waste into useful biochar for soil and filtration.',
    source: 'Scientific Reports – Biochar from Textile Waste (2022)',
  },
  {
    inputMaterial: 'Zotefoams Plastazote LD45FR',
    inputDescription: 'Flame-retardant, closed-cell polyethylene foam with shock absorption and insulation.',
    outputProduct: 'Thermal insulation panels',
    outputDescription: 'Lightweight fire-retardant panels used to insulate walls and spacesuits.',
    sustainability: 86,
    rationale: 'Mechanically repurposed polyethylene foam for insulation.',
    source: 'Zotefoams – Recycling and Technical Data (2020)',
  },
];

const getSustainabilityColor = (percentage: number) => {
  if (percentage >= 80) return '#10B981'; // Green
  if (percentage >= 60) return '#FFF287'; // Yellow
  return '#F59E0B'; // Orange
};

const SpecificSolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredMaterials = materialsData.filter((material) => {
    const matchesSearch =
      material.inputMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.outputProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.inputDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterLevel === 'all' ||
      (filterLevel === 'high' && material.sustainability >= 80) ||
      (filterLevel === 'medium' && material.sustainability >= 60 && material.sustainability < 80) ||
      (filterLevel === 'low' && material.sustainability < 60);

    return matchesSearch && matchesFilter;
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0a0e1a 0%, #1a1625 50%, #0a0e1a 100%)',
        position: 'relative',
        py: 6,
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(200, 63, 18, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Back Button */}
        <Box sx={{ pt: 2, pb: 2 }}>
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
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: '4px',
                height: '32px',
                background: 'linear-gradient(to bottom, #C83F12, #10B981)',
                borderRadius: '2px',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FFF 0%, rgba(255, 255, 255, 0.7) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '28px', md: '42px' },
                letterSpacing: '-0.5px',
              }}
            >
              Material Solutions
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: { xs: '14px', md: '16px' },
              ml: 2,
            }}
          >
            Waste-to-resource conversions for sustainable Mars operations
          </Typography>
        </Box>

        {/* Search and Filter Controls */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C83F12',
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Chip
              label="All"
              onClick={() => setFilterLevel('all')}
              sx={{
                backgroundColor: filterLevel === 'all' ? '#C83F12' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                fontWeight: 500,
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: filterLevel === 'all' ? '#C83F12' : 'rgba(255, 255, 255, 0.12)',
                },
              }}
            />
            <Chip
              label="80%+"
              onClick={() => setFilterLevel('high')}
              sx={{
                backgroundColor: filterLevel === 'high' ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                fontWeight: 500,
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: filterLevel === 'high' ? '#10B981' : 'rgba(255, 255, 255, 0.12)',
                },
              }}
            />
            <Chip
              label="60-79%"
              onClick={() => setFilterLevel('medium')}
              sx={{
                backgroundColor: filterLevel === 'medium' ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                fontWeight: 500,
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: filterLevel === 'medium' ? '#F59E0B' : 'rgba(255, 255, 255, 0.12)',
                },
              }}
            />
            <Chip
              label="<60%"
              onClick={() => setFilterLevel('low')}
              sx={{
                backgroundColor: filterLevel === 'low' ? '#EF4444' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                fontWeight: 500,
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: filterLevel === 'low' ? '#EF4444' : 'rgba(255, 255, 255, 0.12)',
                },
              }}
            />
          </Box>
        </Box>

        {/* Results Count */}
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            mb: 3,
            fontSize: '14px',
          }}
        >
          {filteredMaterials.length} materials
        </Typography>

        {/* Materials Grid */}
        <Grid container spacing={3}>
          {filteredMaterials.map((material, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${getSustainabilityColor(material.sustainability)} 0%, ${getSustainabilityColor(material.sustainability)}60 100%)`,
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${getSustainabilityColor(material.sustainability)}20`,
                    borderColor: `${getSustainabilityColor(material.sustainability)}40`,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={4} alignItems="center">
                    {/* Left Column - Input */}
                    <Grid item xs={12} md={5}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#C83F12',
                            boxShadow: '0 0 8px #C83F1280',
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                          }}
                        >
                          Input Material
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#FFF',
                          fontWeight: 600,
                          fontSize: '17px',
                          mb: 1.5,
                          lineHeight: 1.3,
                        }}
                      >
                        {material.inputMaterial}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '13px',
                          lineHeight: 1.6,
                        }}
                      >
                        {material.inputDescription}
                      </Typography>
                    </Grid>

                    {/* Middle Column - Arrow & Sustainability */}
                    <Grid item xs={12} md={2}>
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              background: `radial-gradient(circle, ${getSustainabilityColor(material.sustainability)}20 0%, transparent 70%)`,
                            }}
                          />
                          <ArrowForwardIcon
                            sx={{
                              color: getSustainabilityColor(material.sustainability),
                              fontSize: '32px',
                              transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' },
                              filter: `drop-shadow(0 0 8px ${getSustainabilityColor(material.sustainability)}60)`,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            position: 'relative',
                            px: 2.5,
                            py: 1,
                            borderRadius: '24px',
                            background: `linear-gradient(135deg, ${getSustainabilityColor(material.sustainability)} 0%, ${getSustainabilityColor(material.sustainability)}CC 100%)`,
                            boxShadow: `0 4px 12px ${getSustainabilityColor(material.sustainability)}40`,
                            border: `1px solid ${getSustainabilityColor(material.sustainability)}40`,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#FFF',
                              fontWeight: 700,
                              fontSize: '14px',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            {material.sustainability}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Right Column - Output */}
                    <Grid item xs={12} md={5}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            boxShadow: '0 0 8px #10B98180',
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                          }}
                        >
                          Output Product
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#10B981',
                          fontWeight: 600,
                          fontSize: '17px',
                          mb: 1.5,
                          lineHeight: 1.3,
                        }}
                      >
                        {material.outputProduct}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '13px',
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {material.outputDescription}
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontSize: '11px',
                            display: 'block',
                            mb: 1,
                            fontStyle: 'italic',
                          }}
                        >
                          {material.rationale}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 1.5,
                            pt: 1.5,
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          <Box
                            sx={{
                              width: '3px',
                              height: '3px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.35)',
                              fontSize: '10px',
                              fontWeight: 500,
                            }}
                          >
                            {material.source}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredMaterials.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>
              No materials found
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.3)', mt: 1 }}>
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SpecificSolutionsPage;
