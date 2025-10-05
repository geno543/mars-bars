import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';
import CloseIcon from '@mui/icons-material/Close';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ScienceIcon from '@mui/icons-material/Science';
import AirIcon from '@mui/icons-material/Air';
import BiotechIcon from '@mui/icons-material/Biotech';
import GroupsIcon from '@mui/icons-material/Groups';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  radius: number;
  title: string;
  details: string;
}

interface ProcessStep {
  stepNumber: number;
  title: string;
  input?: string;
  goal?: string;
  procedure: string[];
  output: string;
  purpose: string;
  equipment?: string[];
  methods?: {
    name: string;
    description: string;
  }[];
}

interface Chapter {
  badge: string;
  title: string;
  text?: string;
  video?: string;
  icon?: any;
  highlights?: string[];
  isInteractive?: boolean;
  marsImage?: string;
  hotspots?: Hotspot[];
  hasDetailedSteps?: boolean;
  detailedSteps?: ProcessStep[];
}

const chapters: Chapter[] = [
  {
    badge: 'Chapter 1: The Vision',
    title: 'Eyes to Discover Mars',
    text: "It can seem strange but what if these eyes present in our life? Mastcam-Z, the high-resolution, stereo color camera system on NASA's Mars 2020 Perseverance rover. The camera system that seeks for signs of ancient life and advances NASA's quest to explore the past habitability of Mars, it's all about Mastcam-Z and how it shapes a new life to discover this mysterious planet!",
    video: '/videos/mastcam.mp4',
    icon: RemoveRedEyeIcon,
    highlights: ['High-Resolution Camera', 'Stereo Color System', 'Ancient Life Detection'],
  },
  {
    badge: 'Chapter 2: The Location',
    title: 'Why Jezero Crater?',
    text: "Why Jezero Crater, not another place in Mars? As scientists think it could hold evidence of ancient microbial life. We, as \"Mars Bars\" believe how it's a large impact crater on Mars, and for its impact it was chosen due to its ancient lakebed environment containing a river delta rich in clay and carbonate minerals, indicating past freshwater conditions.",
    video: '/videos/jazero.mp4',
    icon: PublicIcon,
    highlights: ['Ancient Lake Bed', 'River Delta', 'Clay & Carbonate Minerals'],
  },
  {
    badge: 'Interactive Exploration',
    title: 'Explore Mars Resources',
    isInteractive: true,
    icon: TerrainIcon,
    marsImage: '/images/jazero.jpg',
    hotspots: [
      {
        id: 'bettys-rock',
        x: 14,
        y: 41,
        radius: 4,
        title: "Betty's Rock (Mafic Basalt)",
        details: "Basalt is ideal for extracting oxygen via molten regolith electrolysis or hydrogen reduction. Crushed rock can be used in construction. Resources: Carbon (trace carbonate/CO₂), Oxygen (metal oxides), Water (from hydrated soil/minerals)."
      },
      {
        id: 'regolith',
        x: 37,
        y: 55,
        radius: 5,
        title: "Martian Regolith",
        details: "Process for oxygen (from silicates/oxides), carbon (as carbonates/CO₂), and water (via heating). Surplus regolith can be repurposed for bricks or shielding."
      },
      {
        id: 'rock-cluster',
        x: 62.5,
        y: 46.5,
        radius: 3,
        title: "Igneous Rock Cluster",
        details: "Provides oxygen in mineral form. Post-processing, usable in in-situ construction materials."
      },
      {
        id: 'distant-boulder',
        x: 54,
        y: 15,
        radius: 3,
        title: "Distant Boulder",
        details: "Represents more challenging targets for resource extraction and bulk construction use."
      },
      {
        id: 'sand-area',
        x: 89,
        y: 68,
        radius: 4.5,
        title: "Martian Sand",
        details: "Heated to extract water and some oxygen. Residue used for lightweight, insulating bricks or fills."
      }
    ],
  },
  {
    badge: 'Chapter 3: The Innovation',
    title: 'Trash into Treasure',
    text: "It's not about thinking recycling or reimaging but how to make trash into treasure on Mars with a few conditions as how can we make sure to be sustainable enough and beneficial extremely while minimizing the usage of water, energy input and microplastics not only that but have you ever imagined to turn your useless wastes into a new life on a planet you only want to discover? Or even some rocks around you to a great construction for a new life?",
    video: '/videos/last.mp4',
    icon: RecyclingIcon,
    highlights: ['Zero Waste Goal', 'Resource Optimization', 'Sustainable Systems'],
  },
  {
    badge: 'Chapter 4: Rock to Brick',
    title: 'Recycling Jezero Crater Sedimentary Rocks',
    text: 'Transform ancient sedimentary rocks from Jezero Crater into durable construction materials through a sustainable 5-step process using solar energy and Martian chemistry.',
    video: '/videos/rocks.mp4',
    icon: TerrainIcon,
    highlights: ['Material Collection', 'Binder Activation', 'Compression Molding', 'Thermal Sintering', 'Ready-to-Use Bricks'],
    hasDetailedSteps: true,
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Material Collection and Analysis',
        input: 'Local sedimentary rocks (carbonates, clays, basaltic sandstones) from Jezero delta and crater floor',
        procedure: [
          'Robotic rovers or automated diggers collect broken fragments from deltaic fans or cliff bases',
          'Portable X-ray diffraction instruments (like CheMin) analyze mineral composition',
          'Identify useful binders: iron oxides, sulfates, or clays for natural cementation',
          'Crush and mill larger rocks into fine regolith-sediment powder (~100–500 microns)'
        ],
        output: 'Fine, mineral-rich sedimentary regolith suitable for compaction and sintering',
        purpose: 'Prepares homogenous raw material for brick formation while minimizing dust hazards'
      },
      {
        stepNumber: 2,
        title: 'Binder Activation and Mixture Preparation',
        goal: 'Create a self-binding or partially sintered composite without liquid water',
        procedure: [
          'Use Martian salts and sulfates (from Jezero sediment layers) as natural mineral binders when heated',
          'Optionally mix with small amounts of urea (from crew urine) or epoxy waste to improve binding',
          'Adjust ratios based on mineral content — clays (smectite, illite) help adhesion',
          'Create semi-dry mixture capable of cohesion under pressure and heat'
        ],
        output: 'Semi-dry sediment mixture with cohesive properties',
        purpose: 'Utilizes natural chemistry and waste-derived binders to eliminate need for imported cement or water'
      },
      {
        stepNumber: 3,
        title: 'Compression and Molding',
        equipment: ['Hydraulic press or robotic piston system', 'Mold templates (rectangular or hexagonal for interlocking design)'],
        procedure: [
          'Pour sediment mixture into molds',
          'Apply compression pressure of 10–30 MPa to form dense, uniform blocks',
          'Maintain vacuum conditions to prevent trapped CO₂ pockets'
        ],
        output: 'Pre-brick forms ready for curing',
        purpose: 'Mechanical compaction increases structural density and strength before heating'
      },
      {
        stepNumber: 4,
        title: 'Thermal Curing and Sintering',
        methods: [
          {
            name: 'Solar Sintering',
            description: 'Use mirrored solar concentrators to focus sunlight on brick molds. Heat to 900–1,100°C for 1–2 hours to fuse mineral grains (especially oxides and clays)'
          },
          {
            name: 'Microwave Sintering',
            description: 'Utilize solar-powered microwave sintering unit (NASA-tested technology). Microwave energy directly excites iron-bearing minerals, sintering material uniformly'
          }
        ],
        procedure: [
          'Choose sintering method based on available energy',
          'Heat material to optimal temperature range',
          'Monitor fusion process for uniform strength'
        ],
        output: 'High-strength sedimentary composite bricks, similar to basaltic ceramics',
        purpose: 'Creates bricks capable of withstanding Martian temperature swings and radiation exposure'
      },
      {
        stepNumber: 5,
        title: 'Cooling and Finishing',
        procedure: [
          'Cool gradually to prevent cracking from rapid thermal contraction',
          'Optionally coat bricks with thin dust-sealant layer (melted silica dust or epoxy waste)',
          'Reduce erosion with protective coating'
        ],
        output: 'Ready-to-use Martian bricks for habitat walls, radiation berms, or landing pad stabilization',
        purpose: 'Final processing ensures durability and longevity in Martian environment'
      }
    ]
  },
  {
    badge: 'Chapter 5: MGS-1 Prototype',
    title: 'Transformation of Rocknest Regolith into MGS-1',
    text: 'Converting loose Rocknest regolith into Mars Global Simulant (MGS-1) prototype for standardized construction materials and scientific testing.',
    video: '/videos/phases.mp4',
    icon: TerrainIcon,
    highlights: ['Collection & Pre-Processing', 'MGS-1 Formulation', 'Physical Consolidation'],
    hasDetailedSteps: true,
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Collection and Pre-Processing',
        input: 'Loose Rocknest regolith around Jezero Crater',
        procedure: [
          'Robotic diggers or autonomous scoops collect surface regolith',
          'Material is sieved through vibration mesh filters to remove large rocks (>5 mm)',
          'Finer dust is magnetically separated to remove excess iron oxides',
          'Remaining basaltic soil (mix of amorphous glass, pyroxene, olivine, and plagioclase) becomes MGS-1 feedstock'
        ],
        output: 'Clean, uniform grain-size regolith ready for formulation',
        purpose: 'Ensures consistency, minimizes dust inhalation hazards, and prepares for binding or sintering'
      },
      {
        stepNumber: 2,
        title: 'Formulation into MGS-1 Prototype',
        goal: 'Match mineral proportions of Mars Global Simulant (MGS-1) standard based on Curiosity\'s Rocknest data',
        procedure: [
          'Measure and remix fractions of collected regolith to reach correct mineral ratios',
          'Basaltic composition with balanced crystalline and amorphous phases',
          'Optionally add trace sulfates or oxides (e.g., MgO, Fe₂O₃) to replicate natural chemistry',
          'Adjust moisture to near-zero by vacuum drying to avoid clumping during sintering'
        ],
        output: 'MGS-1 Prototype powder — engineered simulant equivalent to Martian regolith',
        purpose: 'Standardized for repeat use in construction or scientific testing'
      },
      {
        stepNumber: 3,
        title: 'Physical Consolidation (Recycling into Products)',
        goal: 'Transform MGS-1 into functional construction materials - Regolith Bricks',
        procedure: [
          'Mix simulant with binders from mission waste streams (leftover epoxy resin, salt solution, urea from crew)',
          'Compact in molds under pressure (~10–30 MPa)',
          'Cure using microwave sintering (5–15 min per block with solar power) OR focused solar heating via mirrors'
        ],
        output: 'High-strength regolith composite bricks for walls, paths, or structural pads',
        purpose: 'Create durable construction materials using local resources and waste recycling'
      }
    ]
  },
  {
    badge: 'Chapter 6: Water Production',
    title: 'From Oxygen to Water: H₂O Synthesis',
    text: 'To make H₂O (water), you need O₂ (oxygen) plus hydrogen (H₂). So oxygen alone cannot become water. Then, we need a hydrogen source.',
    video: '/videos/last.mp4',
    icon: WaterDropIcon,
    highlights: ['Water Synthesis', 'Hydrogen Sources', 'Electrolysis & Sabatier Reaction'],
    hasDetailedSteps: true,
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Understanding the Chemical Reaction',
        input: 'Oxygen (O₂) and Hydrogen (H₂)',
        goal: 'Combine oxygen and hydrogen to produce water',
        procedure: [
          'Chemical reaction: 2H₂ + O₂ → 2H₂O',
          'Two hydrogen molecules combine with one oxygen molecule',
          'Results in two water molecules',
          'Requires controlled environment and energy input for reaction'
        ],
        output: 'Water (H₂O) for crew hydration and habitat systems',
        purpose: 'Establish the fundamental chemistry needed for water production on Mars'
      },
      {
        stepNumber: 2,
        title: 'Hydrogen Sources on Mars',
        goal: 'Identify and secure hydrogen supply for water synthesis',
        procedure: [
          'Stored hydrogen tanks brought from Earth - initial supply for early missions',
          'Electrolysis of water ice → split H₂O into H₂ + O₂ (requires energy input)',
          'Extract hydrogen from Martian water ice deposits using heating',
          'Recycle hydrogen from Sabatier reaction byproducts'
        ],
        equipment: ['Hydrogen storage tanks (from Earth)', 'Electrolysis units', 'Ice extraction rovers', 'Heating/sublimation systems'],
        output: 'Sustainable hydrogen supply for ongoing water production',
        purpose: 'Create self-sufficient hydrogen source to reduce dependency on Earth resupply'
      },
      {
        stepNumber: 3,
        title: 'Methane Production Loop (Sabatier Reaction)',
        goal: 'Integrate oxygen production with fuel synthesis and water recycling',
        methods: [
          {
            name: 'MOXIE Oxygen Production',
            description: 'NASA\'s MOXIE technology extracts O₂ from Martian CO₂ atmosphere. This oxygen can be used for life support, fuel oxidizer, or water synthesis.'
          },
          {
            name: 'Sabatier Reaction',
            description: 'If H₂ is added (from Earth or water ice) to CO₂, you can produce CH₄ (methane fuel) and H₂O: CO₂ + 4H₂ → CH₄ + 2H₂O'
          },
          {
            name: 'Water Electrolysis Recycling',
            description: 'The byproduct water from Sabatier reaction can be electrolyzed to recycle H₂ back into the system, creating a closed-loop'
          }
        ],
        procedure: [
          'MOXIE extracts O₂ from atmospheric CO₂',
          'Combine CO₂ with H₂ in Sabatier reactor to produce methane fuel and water',
          'Electrolyze excess water to recover hydrogen',
          'Recycle hydrogen back into production loops'
        ],
        output: 'Methane fuel (CH₄), Water (H₂O), and recyclable Hydrogen (H₂)',
        purpose: 'Create integrated system producing both fuel and water while minimizing waste'
      },
      {
        stepNumber: 4,
        title: 'Waste Management Integration',
        goal: 'Connect oxygen from waste management and ISRU into life support systems',
        procedure: [
          'Oxygen from waste recycling processes feeds into life support systems',
          'Oxygen from ISRU (MOXIE) supplements life support and fuel synthesis',
          'Combine O₂ with hydrogen sources to produce drinking water',
          'Use water for crew hydration, habitat humidity control, and agricultural systems',
          'Excess water enters electrolysis loops for hydrogen recovery'
        ],
        output: 'Integrated water-oxygen-hydrogen cycle supporting all habitat systems',
        purpose: 'Maximize resource efficiency by connecting waste management, ISRU, and life support'
      },
      {
        stepNumber: 5,
        title: 'Final Water Production Summary',
        goal: 'Establish complete understanding of Mars water production',
        procedure: [
          'O₂ is extracted from ISRU (MOXIE) and waste reuse processes',
          'H₂ comes from Earth supplies, ice extraction, or electrolysis recycling',
          'Reaction: O₂ + H₂ → H₂O produces water for multiple uses',
          'Water serves crew hydration, habitat humidity control, and electrolysis loops',
          'System creates closed-loop sustainability for long-term Mars habitation'
        ],
        output: 'Self-sustaining water production system for Mars colonization',
        purpose: 'It\'s not that oxygen turns into water, but: O₂ (from ISRU/waste reuse) + H₂ (from ice/other processes) → H₂O for complete life support'
      }
    ]
  },
  {
    badge: 'Category 1',
    title: 'Residence Renovations',
    text: 'Your crew has landed on Mars, and you need to inflate your habitat. Crew members need to spread out an inflatable habitat, then hook its corners to a 3-D cube structure that is used as a frame for the habitat when it inflates. Once the habitat is inflated and secured, the cube is no longer necessary and can be reused. Also, the foam packaging that housed the habitat and its frame are now available for reuse or recycling, as well. How can your crew put these materials to good use?',
    video: '/videos/last.mp4',
    icon: HomeRepairServiceIcon,
    highlights: ['Inflatable Habitat Setup', '3-D Cube Frame Reuse', 'Foam Packaging Recycling'],
  },
  {
    badge: 'Category 2',
    title: 'Cosmic Celebrations',
    text: 'A member of your astronaut crew is celebrating a birthday, and you want to commemorate the experience with a party! However, party supplies are not available on Mars and the only option is to recycle and reuse materials from around the habitat. How will you use these materials to celebrate this event?',
    video: '/videos/last.mp4',
    icon: CelebrationIcon,
    highlights: ['Birthday Celebration', 'Creative Reuse', 'Zero-Waste Party'],
  },
  {
    badge: 'Category 3',
    title: 'Daring Discoveries',
    text: 'Your crew has been experimenting with extracting oxygen from the CO₂ in the Mars atmosphere. After completing these experiments, many elements from your research are now available for reuse or recycling, including the devices used for extraction, and a surplus of carbon that is left over from the extraction. How can your crew put these elements to good use?',
    video: '/videos/last.mp4',
    icon: ScienceIcon,
    highlights: ['Oxygen Extraction', 'Carbon Surplus', 'Equipment Recycling'],
  },
  {
    badge: 'Category 4',
    title: 'Life Support Systems',
    text: 'They are technologies designed to maintain stable environmental and physiological conditions necessary for human survival in hostile or isolated environments, such as space missions, submarines, or medical intensive care units. These systems regulate essential factors like oxygen levels, carbon dioxide removal, temperature, humidity, and waste management. They ensure continuous monitoring and adjustment of vital parameters to sustain life when natural environmental support is unavailable.',
    video: '/videos/last.mp4',
    icon: AirIcon,
    highlights: ['Environmental Control', 'Oxygen & CO₂ Management', 'Vital Parameter Monitoring'],
  },
  {
    badge: 'Category 5',
    title: 'Research Equipment',
    text: 'They refer to the specialized tools, instruments, and devices used by scientists and engineers to conduct experiments, gather data, and analyze results across various scientific disciplines. This category includes laboratory apparatus such as microscopes, spectrometers, centrifuges, sensors, and data acquisition systems. The precision and reliability of research equipment are critical for producing accurate, replicable findings and advancing scientific knowledge.',
    video: '/videos/last.mp4',
    icon: BiotechIcon,
    highlights: ['Laboratory Instruments', 'Data Acquisition', 'Scientific Analysis Tools'],
  },
  {
    badge: 'Who We Are',
    title: 'Meet Mars Bars',
    text: 'After all these detailed information, do you want to know who is Mars Bars? Mars Bars is a team which seeks to find not only a solution but to develop and make a whole waste management infrastructure system by using a high technological level can help in rebuilding Mars specifically our location aware "Jezero Crater". It\'s not only a temporary mission we seek for, but a mission has started with us and will be completed by us, space agencies and our astronauts who also aim to make this mission, a real life is built on Mars.',
    video: '/videos/last.mp4',
    icon: GroupsIcon,
    highlights: ['Waste Management Infrastructure', 'Jezero Crater Focus', 'Long-term Mission'],
  },
];

const JourneyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Trigger animation on chapter change
  useEffect(() => {
    setIsAnimating(true);
    setSelectedHotspot(null);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentChapter]);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const currentChapterData = chapters[currentChapter];
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === chapters.length - 1;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: currentChapterData.video ? '#000000' : 'linear-gradient(180deg, #3B060A 0%, #8A0000 50%, #C83F12 100%)',
      }}
    >
      {/* Background Video (if available) */}
      {currentChapterData.video && (
        <>
          <Box
            key={currentChapter}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              overflow: 'hidden',
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <video
              key={currentChapterData.video}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <source src={currentChapterData.video} type="video/mp4" />
            </video>
          </Box>
          {/* Dark overlay for better text contrast */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(59,6,10,0.7) 50%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 3,
        }}
      >
        {/* Particle Background */}
        {[...Array(30)].map((_, i) => (
          <Box
            key={i}
            className="animate-drift"
            sx={{
              position: 'absolute',
              width: { xs: '2px', md: '3px' },
              height: { xs: '2px', md: '3px' },
              borderRadius: '50%',
              background: 'rgba(255, 242, 135, 0.5)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '150px', md: '250px' },
            height: { xs: '150px', md: '250px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(200, 63, 18, 0.3) 0%, rgba(200, 63, 18, 0) 70%)',
            top: '10%',
            left: '10%',
            filter: 'blur(40px)',
          }}
        />

        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '200px', md: '300px' },
            height: { xs: '200px', md: '300px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(138, 0, 0, 0.3) 0%, rgba(138, 0, 0, 0) 70%)',
            bottom: '15%',
            right: '10%',
            filter: 'blur(50px)',
            animationDelay: '1s',
          }}
        />

        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '180px', md: '280px' },
            height: { xs: '180px', md: '280px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255, 242, 135, 0.2) 0%, rgba(255, 242, 135, 0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 100,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '20px 15px', md: '30px 40px' },
          transform: 'scale(0.85)',
          transformOrigin: 'center center',
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 30 },
            left: { xs: 20, md: 30 },
          }}
        >
          <Tooltip title="Back to Home" arrow>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 242, 135, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(200, 63, 18, 0.4)',
                  borderColor: '#FFF287',
                  transform: 'translateX(-4px) scale(1.1)',
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Chapter Icon */}
        {currentChapterData.icon && (
          <Box
            className="animate-ripple"
            sx={{
              marginBottom: { xs: 2, md: 3 },
              width: { xs: '70px', md: '100px' },
              height: { xs: '70px', md: '100px' },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'radial-gradient(circle, rgba(200, 63, 18, 0.3) 0%, rgba(200, 63, 18, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 242, 135, 0.3)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'scale(0.5) rotate(-180deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {currentChapterData.icon && React.createElement(currentChapterData.icon, {
              sx: {
                fontSize: { xs: '35px', md: '50px' },
                color: '#FFF287',
              },
            })}
          </Box>
        )}

        {/* Content Container */}
        <Box
          ref={contentRef}
          sx={{
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '50px',
              background: 'rgba(255, 242, 135, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 242, 135, 0.3)',
              marginBottom: { xs: 1.5, md: 2 },
              boxShadow: '0 8px 32px rgba(200, 63, 18, 0.2)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateX(-50px)' : 'translateX(0)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '10px', md: '12px' },
                fontWeight: 500,
                color: '#FFF287',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {currentChapterData.badge}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: '28px', sm: '36px', md: '48px' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: { xs: 1.5, md: 2.5 },
              lineHeight: 1.2,
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 242, 135, 0.4))',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {currentChapterData.title}
          </Typography>

          {/* Text or Interactive Content */}
          {currentChapterData.hasDetailedSteps && currentChapterData.detailedSteps ? (
            // Detailed Process Steps for Chapters with detailed content
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                marginBottom: 3,
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            >
              {/* Intro Text */}
              {currentChapterData.text && (
                <Typography
                  sx={{
                    fontSize: { xs: '14px', md: '16px' },
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.7,
                    textAlign: 'center',
                    marginBottom: 2,
                    padding: '16px 24px',
                    background: 'rgba(255, 242, 135, 0.08)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 242, 135, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {currentChapterData.text}
                </Typography>
              )}

              {/* Render Dynamic Steps */}
              {currentChapterData.detailedSteps.map((step, index) => (
                <Box
                  key={step.stepNumber}
                  sx={{
                    background: `linear-gradient(135deg, rgba(255, 242, 135, ${0.08 + index * 0.01}) 0%, rgba(200, 63, 18, ${0.08 + index * 0.01}) 100%)`,
                    border: '2px solid rgba(255, 242, 135, 0.3)',
                    borderRadius: '20px',
                    padding: { xs: 2.5, md: 3.5 },
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(200, 63, 18, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(255, 242, 135, 0.3)',
                      borderColor: 'rgba(255, 242, 135, 0.5)',
                    },
                  }}
                >
                  {/* Step Header */}
                  <Typography
                    sx={{
                      fontSize: { xs: '18px', md: '22px' },
                      fontWeight: 700,
                      color: '#FFF287',
                      marginBottom: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '18px',
                        color: '#3B060A',
                        boxShadow: '0 4px 16px rgba(255, 242, 135, 0.4)',
                      }}
                    >
                      {step.stepNumber}
                    </Box>
                    {step.title}
                  </Typography>

                  {/* Input */}
                  {step.input && (
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '15px' },
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.8,
                        marginBottom: 1.5,
                      }}
                    >
                      <strong style={{ color: '#FFF287' }}>Input:</strong> {step.input}
                    </Typography>
                  )}

                  {/* Goal */}
                  {step.goal && (
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '15px' },
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.8,
                        marginBottom: 1.5,
                      }}
                    >
                      <strong style={{ color: '#FFF287' }}>Goal:</strong> {step.goal}
                    </Typography>
                  )}

                  {/* Equipment */}
                  {step.equipment && step.equipment.length > 0 && (
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '15px' },
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.8,
                        marginBottom: 1.5,
                      }}
                    >
                      <strong style={{ color: '#FFF287' }}>Equipment Needed:</strong><br />
                      {step.equipment.map((eq, i) => (
                        <span key={i}>• {eq}<br /></span>
                      ))}
                    </Typography>
                  )}

                  {/* Methods */}
                  {step.methods && step.methods.length > 0 && (
                    <Box sx={{ marginBottom: 2 }}>
                      {step.methods.map((method, i) => (
                        <Typography
                          key={i}
                          sx={{
                            fontSize: { xs: '13px', md: '15px' },
                            color: 'rgba(255, 255, 255, 0.85)',
                            lineHeight: 1.8,
                            marginBottom: 1,
                          }}
                        >
                          <strong style={{ color: '#FFF287' }}>{method.name}:</strong><br />
                          {method.description}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Procedure */}
                  {step.procedure && step.procedure.length > 0 && (
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '15px' },
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.8,
                        marginBottom: 2,
                      }}
                    >
                      <strong style={{ color: '#FFF287' }}>Procedure:</strong><br />
                      {step.procedure.map((proc, i) => (
                        <span key={i}>• {proc}<br /></span>
                      ))}
                    </Typography>
                  )}

                  {/* Output */}
                  <Typography
                    sx={{
                      fontSize: { xs: '13px', md: '15px' },
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.8,
                      marginBottom: 1.5,
                    }}
                  >
                    <strong style={{ color: '#C83F12' }}>Output:</strong> {step.output}
                  </Typography>

                  {/* Purpose */}
                  <Typography
                    sx={{
                      fontSize: { xs: '13px', md: '15px' },
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                    }}
                  >
                    <strong style={{ color: '#FFF287' }}>Purpose:</strong> {step.purpose}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : currentChapterData.isInteractive ? (
            <Box sx={{ width: '100%' }}>
              {/* Instruction Text */}
              <Typography
                sx={{
                  fontSize: { xs: '13px', sm: '14px', md: '16px' },
                  fontWeight: 500,
                  color: '#FFF287',
                  textAlign: 'center',
                  marginBottom: 2,
                  padding: '10px 20px',
                  background: 'rgba(255, 242, 135, 0.1)',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 242, 135, 0.3)',
                  backdropFilter: 'blur(10px)',
                  display: 'inline-block',
                  opacity: isAnimating ? 0 : 1,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                }}
              >
                Click the glowing hotspots to explore Mars resources
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '1400px',
                  margin: '0 auto',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 242, 135, 0.2)',
                  border: '3px solid rgba(255, 242, 135, 0.4)',
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                  '&:hover': {
                    boxShadow: '0 24px 70px rgba(255, 242, 135, 0.3), 0 0 0 1px rgba(255, 242, 135, 0.4)',
                    borderColor: 'rgba(255, 242, 135, 0.6)',
                  },
                }}
              >
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />
                <Box
                  component="img"
                  src={currentChapterData.marsImage}
                  alt="Mars Surface"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'brightness(1.05) contrast(1.1)',
                  }}
                />
              {currentChapterData.hotspots?.map((hotspot, index) => (
                <Tooltip
                  key={hotspot.id}
                  title={hotspot.title}
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: 'rgba(59, 6, 10, 0.95)',
                        color: '#FFF287',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 242, 135, 0.3)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      },
                    },
                    arrow: {
                      sx: {
                        color: 'rgba(59, 6, 10, 0.95)',
                      },
                    },
                  }}
                >
                  <Box
                    onClick={() => setSelectedHotspot(hotspot)}
                    sx={{
                      position: 'absolute',
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      width: `${hotspot.radius * 2}%`,
                      height: `${hotspot.radius * 2}%`,
                      borderRadius: '50%',
                      border: '3px solid #FFF287',
                      backgroundColor: 'rgba(255, 242, 135, 0.25)',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      animation: `pulse ${2 + index * 0.3}s ease-in-out infinite`,
                      zIndex: 2,
                      '@keyframes pulse': {
                        '0%, 100%': {
                          boxShadow: '0 0 0 0 rgba(255, 242, 135, 0.8), 0 0 20px rgba(255, 242, 135, 0.6)',
                        },
                        '50%': {
                          boxShadow: '0 0 0 20px rgba(255, 242, 135, 0), 0 0 30px rgba(255, 242, 135, 0.4)',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(200, 63, 18, 0.5)',
                        borderColor: '#C83F12',
                        borderWidth: '4px',
                        transform: 'translate(-50%, -50%) scale(1.3)',
                        zIndex: 20,
                        boxShadow: '0 0 30px rgba(255, 242, 135, 0.9), 0 0 60px rgba(200, 63, 18, 0.6)',
                        animation: 'none',
                      },
                      '&:active': {
                        transform: 'translate(-50%, -50%) scale(1.1)',
                      },
                    }}
                  >
                    {/* Inner Dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#FFF287',
                        boxShadow: '0 0 15px rgba(255, 242, 135, 1), inset 0 0 5px rgba(200, 63, 18, 0.8)',
                      }}
                    />
                    {/* Outer Ring */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        height: '60%',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 242, 135, 0.5)',
                        animation: 'rotate 3s linear infinite',
                        '@keyframes rotate': {
                          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                        },
                      }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: '13px', sm: '14px', md: '16px' },
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: 1.8,
                marginBottom: { xs: 2, md: 3 },
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.9), 0 4px 25px rgba(0, 0, 0, 0.7)',
                padding: '20px 30px',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 242, 135, 0.2)',
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            >
              {currentChapterData.text}
            </Typography>
          )}

          {/* Highlights Section */}
          {currentChapterData.highlights && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'center',
                marginBottom: { xs: 2, md: 3 },
              }}
            >
              {currentChapterData.highlights.map((highlight, index) => (
                <Chip
                  key={index}
                  label={highlight}
                  sx={{
                    fontSize: { xs: '11px', md: '13px' },
                    fontWeight: 600,
                    padding: { xs: '16px 12px', md: '18px 14px' },
                    background: 'rgba(255, 242, 135, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 242, 135, 0.4)',
                    color: '#FFF287',
                    boxShadow: '0 4px 16px rgba(200, 63, 18, 0.2)',
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.1}s`,
                    '&:hover': {
                      background: 'rgba(255, 242, 135, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 24px rgba(255, 242, 135, 0.4)',
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: { xs: 2, md: 3 },
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
            }}
          >
            {/* Back Button */}
            {!isFirstChapter && (
              <Button
                variant="outlined"
                onClick={() => setCurrentChapter(currentChapter - 1)}
                startIcon={<ArrowBackIcon />}
                sx={{
                  minWidth: { xs: '140px', md: '160px' },
                  padding: { xs: '14px 28px', md: '16px 32px' },
                  fontSize: { xs: '15px', md: '16px' },
                  fontWeight: 600,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                Previous
              </Button>
            )}

            {/* Next Button */}
            {!isLastChapter && (
              <Button
                variant="contained"
                onClick={handleNextChapter}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  minWidth: { xs: '280px', md: '240px' },
                  padding: { xs: '16px 36px', md: '18px 40px' },
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow:
                    '0 8px 32px rgba(200, 63, 18, 0.5), 0 0 40px rgba(200, 63, 18, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow:
                      '0 12px 48px rgba(200, 63, 18, 0.7), 0 0 60px rgba(255, 242, 135, 0.5)',
                  },
                }}
              >
                Continue Journey
              </Button>
            )}

            {/* Final Button */}
            {isLastChapter && (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  minWidth: { xs: '280px', md: '240px' },
                  padding: { xs: '16px 36px', md: '18px 40px' },
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                  color: '#3B060A',
                  textTransform: 'none',
                  boxShadow:
                    '0 8px 32px rgba(255, 242, 135, 0.5), 0 0 40px rgba(255, 242, 135, 0.4)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFF287 0%, #FFFFFF 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow:
                      '0 12px 48px rgba(255, 242, 135, 0.7), 0 0 60px rgba(255, 242, 135, 0.6)',
                  },
                }}
              >
                Complete Journey
              </Button>
            )}
          </Box>

          {/* Progress Dots */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
            }}
          >
            {chapters.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentChapter(index)}
                sx={{
                  width: currentChapter === index ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background:
                    currentChapter === index
                      ? 'linear-gradient(90deg, #FFF287 0%, #C83F12 100%)'
                      : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow:
                    currentChapter === index
                      ? '0 4px 16px rgba(255, 242, 135, 0.5)'
                      : 'none',
                  '&:hover': {
                    background:
                      currentChapter === index
                        ? 'linear-gradient(90deg, #FFF287 0%, #C83F12 100%)'
                        : 'rgba(255, 255, 255, 0.5)',
                    transform: 'scale(1.1)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Hotspot Details Dialog */}
      <Dialog
        open={selectedHotspot !== null}
        onClose={() => setSelectedHotspot(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(59, 6, 10, 0.98) 0%, rgba(138, 0, 0, 0.98) 50%, rgba(59, 6, 10, 0.98) 100%)',
            backdropFilter: 'blur(30px)',
            border: '3px solid rgba(255, 242, 135, 0.4)',
            borderRadius: '24px',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 100px rgba(200, 63, 18, 0.3)',
            overflow: 'hidden',
          },
        }}
        TransitionProps={{
          timeout: 400,
        }}
      >
        {/* Decorative Top Border */}
        <Box
          sx={{
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, #FFF287 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 242, 135, 0.6)',
          }}
        />
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid rgba(255, 242, 135, 0.2)',
            pb: 2.5,
            pt: 3,
            px: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                boxShadow: '0 0 20px rgba(255, 242, 135, 0.8)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '20px', md: '24px' },
                background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255, 242, 135, 0.3)',
              }}
            >
              {selectedHotspot?.title}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setSelectedHotspot(null)}
            sx={{
              color: '#FFF287',
              border: '2px solid rgba(255, 242, 135, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(200, 63, 18, 0.3)',
                borderColor: '#C83F12',
                transform: 'rotate(90deg) scale(1.1)',
              },
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 3, px: 4 }}>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '15px', md: '17px' },
              lineHeight: 1.9,
              textAlign: 'left',
              mb: 3,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            {selectedHotspot?.details}
          </Typography>
          {/* Resource Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              padding: '10px 20px',
              borderRadius: '50px',
              background: 'rgba(255, 242, 135, 0.1)',
              border: '2px solid rgba(255, 242, 135, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFF287',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Extractable Resources
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0, gap: 2 }}>
          <Button
            onClick={() => setSelectedHotspot(null)}
            variant="contained"
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
              color: '#FFF',
              padding: '14px 32px',
              fontSize: { xs: '15px', md: '17px' },
              fontWeight: 700,
              borderRadius: '16px',
              textTransform: 'none',
              border: '2px solid rgba(255, 242, 135, 0.2)',
              boxShadow: '0 6px 24px rgba(200, 63, 18, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 30px rgba(255, 242, 135, 0.5)',
                borderColor: '#FFF287',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JourneyPage;
