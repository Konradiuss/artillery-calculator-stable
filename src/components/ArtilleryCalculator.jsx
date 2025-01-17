import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function polarToCartesian(distance, azimuth) {
  const angleRad = (90 - azimuth) * Math.PI / 180;
  const x = distance * Math.cos(angleRad);
  const y = distance * Math.sin(angleRad);
  return { x, y };
}


const normalizeAzimuth = (value) => {
  
  let numValue = Number(value);

  
  while (numValue < 0) {
    numValue += 360;
  }
  numValue = numValue % 360;

  return numValue.toString();
};

const normalizeDistance = (value) => {
  
  let numValue = Number(value);

  
  if (isNaN(numValue) || numValue < 0) {
    return '0';
  }

  return numValue.toString();
};

const Card = ({ children }) => (
  <div className="bg-[#2E2420] rounded-lg shadow-xl border border-[#4A3C2E]">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-[#4A3C2E]">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-[#8B7355]">{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const WindIndicator = ({ windDirection, shellAzimuth }) => {
  const { t } = useLanguage();
  const MUTED_RED = "#b03030";
  const MUTED_BLUE = "#2a4d85";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 200" className="w-40 h-40">
     
        <circle cx="100" cy="100" r="80" fill="none" stroke="#4A3C2E" strokeWidth="1" />

        
        <text x="100" y="15" textAnchor="middle" fill="#8B7355" className="font-bold">{t('north')}</text>
        <text x="185" y="100" textAnchor="middle" fill="#8B7355" className="font-bold">{t('east')}</text>
        <text x="100" y="190" textAnchor="middle" fill="#8B7355" className="font-bold">{t('south')}</text>
        <text x="15" y="100" textAnchor="middle" fill="#8B7355" className="font-bold">{t('west')}</text>

        <text x="157" y="43" textAnchor="middle" fill="#8B7355" className="font-bold">{t('northeast')}</text>
        <text x="43" y="43" textAnchor="middle" fill="#8B7355" className="font-bold">{t('northwest')}</text>
        <text x="157" y="157" textAnchor="middle" fill="#8B7355" className="font-bold">{t('southeast')}</text>
        <text x="43" y="157" textAnchor="middle" fill="#8B7355" className="font-bold">{t('southwest')}</text>

       
        <defs>
          <marker id="redArrow" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={MUTED_RED} />
          </marker>
          <marker id="blueArrow" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={MUTED_BLUE} />
          </marker>
        </defs>

     
        <g transform={`rotate(${shellAzimuth} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="30"
            stroke={MUTED_RED} strokeWidth="2" markerEnd="url(#redArrow)" />
        </g>

       
        <g transform={`rotate(${windDirection} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="40"
            stroke={MUTED_BLUE} strokeWidth="2" strokeDasharray="4"
            markerEnd="url(#blueArrow)" />
        </g>
      </svg>

     
      <div className="flex gap-4 text-sm mt-2">
        <div className="flex items-center">
          <div className="w-4 h-0.5 mr-1" style={{ backgroundColor: MUTED_RED }}></div>
          <span>{t('firingDirection')}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 mr-1 border-dashed border-t" style={{ backgroundColor: MUTED_BLUE }}></div>
          <span>{t('windIndicator')}</span>
        </div>
      </div>
    </div>
  );
};


const BattlefieldMap = ({
  artilleryDistance,
  artilleryAzimuth,
  targetDistance,
  targetAzimuth,
  result
}) => {
  const { t } = useLanguage();
  const artillery = polarToCartesian(Number(artilleryDistance), Number(artilleryAzimuth));
  const target = polarToCartesian(Number(targetDistance), Number(targetAzimuth));
  const maxDistance = Math.max(
    artilleryDistance,
    targetDistance,
    Math.sqrt(target.x * target.x + target.y * target.y)
  );
  const scale = 80 / maxDistance;
  const scaledArtillery = {
    x: artillery.x * scale + 100,
    y: -artillery.y * scale + 100
  };
  const scaledTarget = {
    x: target.x * scale + 100,
    y: -target.y * scale + 100
  };
  const spotterPos = { x: 100, y: 100 };

  
  const getAngle = (x1, y1, x2, y2) => {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  };

  
  const getMidPoint = (x1, y1, x2, y2, offset = 0) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    let angle = getAngle(x1, y1, x2, y2);

    
    if (angle > 90 || angle < -90) {
      angle = angle + 180;
    }

    return {
      x: midX + offset * Math.cos((angle + 90) * Math.PI / 180),
      y: midY + offset * Math.sin((angle + 90) * Math.PI / 180),
      angle: angle
    };
  };

  return (

    <div className="mt-4">
      <svg viewBox="0 0 200 220" className="w-full h-full max-w-md mx-auto"> 
       
        <circle cx="100" cy="100" r="90" fill="none" stroke="#4A3C2E" strokeWidth="1" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="#4A3C2E" strokeWidth="0.5" strokeDasharray="2" />

   
        <line
          x1={spotterPos.x}
          y1={spotterPos.y}
          x2={scaledArtillery.x}
          y2={scaledArtillery.y}
          stroke="#6B4423"
          strokeWidth="1"
        />
        <line
          x1={spotterPos.x}
          y1={spotterPos.y}
          x2={scaledTarget.x}
          y2={scaledTarget.y}
          stroke="#8B7355"
          strokeWidth="1"
        />
        <line
          x1={scaledArtillery.x}
          y1={scaledArtillery.y}
          x2={scaledTarget.x}
          y2={scaledTarget.y}
          stroke="#FF4444"
          strokeWidth="1"
          strokeDasharray="4"
        />

       
        <circle cx={spotterPos.x} cy={spotterPos.y} r="3" fill="#8B7355" />
        <circle cx={scaledArtillery.x} cy={scaledArtillery.y} r="3" fill="#6B4423" />
        <circle cx={scaledTarget.x} cy={scaledTarget.y} r="3" fill="#FF4444" />

   
        {[
          {
            p1: spotterPos,
            p2: scaledArtillery,
            text: `${artilleryDistance}м / ${artilleryAzimuth}°`,
            color: "#6B4423"
          },
          {
            p1: spotterPos,
            p2: scaledTarget,
            text: `${targetDistance}м / ${targetAzimuth}°`,
            color: "#8B7355"
          },
          {
            p1: scaledArtillery,
            p2: scaledTarget,
            text: result ? `${result.baseDistance}м / ${result.baseAzimuth}°` : "",
            color: "#FF4444"
          }
        ].map((line, index) => {
          const mid = getMidPoint(line.p1.x, line.p1.y, line.p2.x, line.p2.y, 8);
          return (
            <text
              key={index}
              x={mid.x}
              y={mid.y}
              fill={line.color}
              fontSize="6"
              textAnchor="middle"
              transform={`rotate(${mid.angle}, ${mid.x}, ${mid.y})`}
            >
              {line.text}
            </text>
          );
        })}


        <g transform="translate(40, 200)">
          <g className="flex items-center">
            <circle cx="0" cy="0" r="3" fill="#6B4423" />
            <text x="8" y="3" fill="#6B4423" fontSize="8">{t('legendArtillery')}</text>
          </g>
          <g transform="translate(60, 0)">
            <circle cx="0" cy="0" r="3" fill="#8B7355" />
            <text x="8" y="3" fill="#8B7355" fontSize="8">{t('legendSpotter')}</text>
          </g>
          <g transform="translate(120, 0)">
            <circle cx="0" cy="0" r="3" fill="#FF4444" />
            <text x="8" y="3" fill="#FF4444" fontSize="8">{t('legendTarget')}</text>
          </g>
        </g>
      </svg>
    </div>
  );
};


const TriangulationMap = ({
  targetDistance,
  targetAzimuth,
  impactDistance,
  impactAzimuth,
  result
}) => {
  const { t } = useLanguage();
  const target = polarToCartesian(Number(targetDistance), Number(targetAzimuth));
  const impact = polarToCartesian(Number(impactDistance), Number(impactAzimuth));

  const maxDistance = Math.max(
    targetDistance,
    impactDistance
  );

  const scale = 80 / maxDistance;

  const scaledTarget = {
    x: target.x * scale + 100,
    y: -target.y * scale + 100
  };

  const scaledImpact = {
    x: impact.x * scale + 100,
    y: -impact.y * scale + 100
  };

  const spotterPos = { x: 100, y: 100 };

  const getMidPoint = (x1, y1, x2, y2, offset = 0) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    if (angle > 90 || angle < -90) {
      angle = angle + 180;
    }

    return {
      x: midX + offset * Math.cos((angle + 90) * Math.PI / 180),
      y: midY + offset * Math.sin((angle + 90) * Math.PI / 180),
      angle: angle
    };
  };

  return (
    <svg viewBox="0 0 200 220" className="w-full h-full max-w-md mx-auto">
   
      <circle cx="100" cy="100" r="90" fill="none" stroke="#4A3C2E" strokeWidth="1" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#4A3C2E" strokeWidth="0.5" strokeDasharray="2" />


      <line
        x1={spotterPos.x}
        y1={spotterPos.y}
        x2={scaledTarget.x}
        y2={scaledTarget.y}
        stroke="#FF4444"
        strokeWidth="1"
      />
      <line
        x1={spotterPos.x}
        y1={spotterPos.y}
        x2={scaledImpact.x}
        y2={scaledImpact.y}
        stroke="#8B7355"
        strokeWidth="1"
      />


      <circle cx={spotterPos.x} cy={spotterPos.y} r="3" fill="#8B7355" />
      <circle cx={scaledTarget.x} cy={scaledTarget.y} r="3" fill="#FF4444" />
      <circle cx={scaledImpact.x} cy={scaledImpact.y} r="3" fill="#6B4423" />

    
      {[
        {
          p1: spotterPos,
          p2: scaledTarget,
          text: `${targetDistance}м / ${targetAzimuth}°`,
          color: "#FF4444"
        },
        {
          p1: spotterPos,
          p2: scaledImpact,
          text: `${impactDistance}м / ${impactAzimuth}°`,
          color: "#8B7355"
        }
      ].map((line, index) => {
        const mid = getMidPoint(line.p1.x, line.p1.y, line.p2.x, line.p2.y, 8);
        return (
          <text
            key={index}
            x={mid.x}
            y={mid.y}
            fill={line.color}
            fontSize="6"
            textAnchor="middle"
            transform={`rotate(${mid.angle}, ${mid.x}, ${mid.y})`}
          >
            {line.text}
          </text>
        );
      })}

      <g transform="translate(40, 200)">
        <g className="flex items-center">
          <circle cx="0" cy="0" r="3" fill="#8B7355" />
          <text x="8" y="3" fill="#8B7355" fontSize="8">{t('legendSpotter')}</text>
        </g>
        <g transform="translate(60, 0)">
          <circle cx="0" cy="0" r="3" fill="#FF4444" />
          <text x="8" y="3" fill="#FF4444" fontSize="8">{t('legendTarget')}</text>
        </g>
        <g transform="translate(120, 0)">
          <circle cx="0" cy="0" r="3" fill="#6B4423" />
          <text x="8" y="3" fill="#6B4423" fontSize="8">{t('legendImpact')}</text>
        </g>
      </g>
    </svg>
  );
};


const WindLevelGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-[#2E2420] rounded border border-[#4A3C2E] overflow-hidden">
            <img
              src="/WindSockAnim1.gif"
              alt={t('level1')}  
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-sm font-medium text-[#8B7355]">{t('level1')}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-[#2E2420] rounded border border-[#4A3C2E] overflow-hidden">
            <img
              src="/WindSockAnim2.gif"
              alt={t('level2')}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-sm font-medium text-[#8B7355]">{t('level2')}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-[#2E2420] rounded border border-[#4A3C2E] overflow-hidden">
            <img
              src="/WindSockAnim3.gif"
              alt={t('level3')}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-sm font-medium text-[#8B7355]">{t('level3')}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 bg-[#2E2420] rounded border border-[#4A3C2E] overflow-hidden">
            <img
              src="/WindSockAnim4.gif"
              alt={`${t('level4')}-${t('level5')}`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-sm font-medium text-[#8B7355]">{t('level4')}-{t('level5')}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-[#2E2420] rounded border border-[#4A3C2E] overflow-hidden">
          <img
            src="/Flag_Wind_Strengths.gif"
            alt={t('windLevels')}
            className="w-[320px] h-[180px]"
          />
        </div>
      </div>
    </div>
  );
};


const TriangulationCalculator = ({ setTriangulationHistory }) => {
  const [targetDistance, setTargetDistance] = useState('100');
  const [targetAzimuth, setTargetAzimuth] = useState('180');
  const [impactDistance, setImpactDistance] = useState('80');
  const [impactAzimuth, setImpactAzimuth] = useState('90');
  const [result, setResult] = useState(null);
  const { t } = useLanguage();

  function calculateArtilleryPosition() {
    if (!targetDistance || !targetAzimuth || !impactDistance || !impactAzimuth) {
      return;
    }


    const correctionDistance = Number(targetDistance) - Number(impactDistance);
    let correctionAzimuth = Number(targetAzimuth) - Number(impactAzimuth);

    
    if (correctionAzimuth > 180) correctionAzimuth -= 360;
    if (correctionAzimuth < -180) correctionAzimuth += 360;

    const calculatedResult = {
      
      correctionDistance: Math.round(correctionDistance * 10) / 10,
      correctionAzimuth: Math.round(correctionAzimuth * 10) / 10,

      
      finalCorrection: {
        distance: Math.round(correctionDistance * 10) / 10,
        azimuth: Math.round(correctionAzimuth * 10) / 10
      }
    };

    setResult(calculatedResult);

    setTriangulationHistory(prev => [{
      timestamp: Date.now(),
      settings: {
        targetDistance,
        targetAzimuth,
        impactDistance,
        impactAzimuth
      },
      result: calculatedResult
    }, ...prev]);
  }

  return (
    <div className="space-y-4 text-[#8B7355]">
      <div className="p-4 bg-[#4A3C2E] rounded-lg border border-[#6B4423]">
        <p className="text-sm whitespace-pre-line">
          {t('triangulationInstructions')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium"> {t('targetDistance')} ({t('meters')}) </label>
          <input
            type="number"
            value={targetDistance}
            onChange={(e) => setTargetDistance(normalizeDistance(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium"> {t('targetAzimuth')} ({t('degrees')}) </label>
          <input
            type="number"
            value={targetAzimuth}
            onChange={(e) => setTargetAzimuth(normalizeAzimuth(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
            max="359"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium"> {t('impactDistance')} ({t('meters')}) </label>
          <input
            type="number"
            value={impactDistance}
            onChange={(e) => setImpactDistance(normalizeDistance(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium"> {t('impactAzimuth')} ({t('degrees')}) </label>
          <input
            type="number"
            value={impactAzimuth}
            onChange={(e) => setImpactAzimuth(normalizeAzimuth(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
            max="359"
          />
        </div>
      </div>

      <button
        onClick={calculateArtilleryPosition}
        className="w-full p-2 bg-[#4A3C2E] text-[#8B7355] rounded-lg hover:bg-[#6B4423]"
      >
        {t('calculateCorrections')}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
          <h3 className="font-medium">{t('calculationResults')}:</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-600">{t('requiredCorrections')}:</p>
              <p>{t('changeDistance')}: {result.finalCorrection.distance > 0 ? "+" : ""}{result.finalCorrection.distance} {t('meters')}</p>
              <p>{t('changeAzimuth')}: {result.finalCorrection.azimuth > 0 ? "+" : ""}{result.finalCorrection.azimuth}°</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-yellow-500">
              {t('correctionNote')}
            </p>
          </div>
          <TriangulationMap
            targetDistance={targetDistance}
            targetAzimuth={targetAzimuth}
            impactDistance={impactDistance}
            impactAzimuth={impactAzimuth}
            result={result}
          />
        </div>
      )}
    </div>
  );
};

const CommonBottomBlocks = () => {
  const { t } = useLanguage(); 

  return (
    <>
      <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
        <h3 className="font-medium mb-2 text-[#8B7355]">{t('windDeviation')}</h3>
        <p className="text-sm text-[#8B7355]">
          {t('deviationNote')}<br />
          • 120mm: 10 {t('meters')} ({t('maximum')} 50{t('meters')})<br />
          • 150mm: 10 {t('meters')} ({t('maximum')} 50{t('meters')})<br />
          • Rocket Artillery: 10 {t('meters')} ({t('maximum')} 50{t('meters')})<br />
          • 300mm: 50 {t('meters')} ({t('maximum')} 250{t('meters')})<br />
          <br />
          {t('windEffectNote')}<br />
          {t('windDirections')}
        </p>
      </div>

      <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
        <h3 className="font-medium mb-4 text-[#8B7355]">{t('windGuide')}</h3>
        <WindLevelGuide />
      </div>

      <ContactBlock />
    </>
  );
};


const ArtilleryGroupCalculator = ({ setGroupHistory }) => {
  const [centralDistance, setCentralDistance] = useState('100');
  const [centralAzimuth, setCentralAzimuth] = useState('0');
  const [artillery, setArtillery] = useState([]);
  const GRID_SIZE_X = 100;
  const GRID_SIZE_Y = 50;
  const GRID_PADDING = 4;
  const CELL_SIZE = 1;
  const [draggingArt, setDraggingArt] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickPosition, setLastClickPosition] = useState(null);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const [tooltipTimer, setTooltipTimer] = useState(null);
  const { t } = useLanguage();


  useEffect(() => {
    return () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    };
  }, [tooltipTimer]);


 
  const handleGridClick = (e) => {
    const svg = e.currentTarget;
    const pt = new DOMPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgMatrix = svg.getScreenCTM().inverse();
    const svgPoint = pt.matrixTransform(svgMatrix);
    
    const roundedX = Math.round(svgPoint.x);
    
    const roundedY = GRID_SIZE_Y - Math.round(svgPoint.y);

   
    if (roundedX < 0 || roundedX > GRID_SIZE_X || roundedY < 0 || roundedY > GRID_SIZE_Y) {
      return;
    }

    const currentTime = new Date().getTime();

    if (lastClickPosition &&
      lastClickPosition.x === roundedX &&
      lastClickPosition.y === roundedY &&
      currentTime - lastClickTime < 300) {

      const existingArtIndex = artillery.findIndex(
        art => Math.abs(art.x - roundedX) < 1 && Math.abs(art.y - roundedY) < 1
      );

      if (existingArtIndex !== -1) {
        if (artillery[existingArtIndex].isCentral) return;
        setArtillery(artillery.filter((_, index) => index !== existingArtIndex));
      } else {
        const newArtillery = {
          id: Date.now(),
          x: roundedX,
          y: roundedY,
          isCentral: artillery.length === 0,
          correction: { distance: 0, azimuth: 0 }
        };
        setArtillery([...artillery, newArtillery]);
      }

      setLastClickTime(0);
      setLastClickPosition(null);
    } else {
      setLastClickTime(currentTime);
      setLastClickPosition({ x: roundedX, y: roundedY });
    }
  };

  const handleDragStart = (e, art) => {
    e.stopPropagation();
    setDraggingArt(art);
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (!isDragging || !draggingArt) return;

    const svg = e.currentTarget;
    const pt = new DOMPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgMatrix = svg.getScreenCTM().inverse();
    const svgPoint = pt.matrixTransform(svgMatrix);

    const roundedX = Math.round(svgPoint.x);
    const roundedY = GRID_SIZE_Y - Math.round(svgPoint.y); 

    if (roundedX >= 0 && roundedX <= GRID_SIZE_X && roundedY >= 0 && roundedY <= GRID_SIZE_Y) {
      setArtillery(artillery.map(art =>
        art.id === draggingArt.id
          ? { ...art, x: roundedX, y: roundedY }
          : art
      ));
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggingArt(null);
  };

  const getArtilleryNumber = (artillery, currentIndex) => {
    
    if (artillery[currentIndex].isCentral) return 1;

    
    let nonCentralCount = 0;
    for (let i = 0; i < currentIndex; i++) {
      if (!artillery[i].isCentral) {
        nonCentralCount++;
      }
    }


    return nonCentralCount + 2;
  };

  const calculateDistance = (art1, art2) => {
    const dx = (art1.x - art2.x) * CELL_SIZE;
    const dy = (art1.y - art2.y) * CELL_SIZE;
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  };


  const calculateCorrections = () => {
    const centralArt = artillery.find(art => art.isCentral);
    if (!centralArt) return;

  
    const targetAngleRad = (90 - Number(centralAzimuth)) * Math.PI / 180;
    const targetPoint = {
      x: centralArt.x + Number(centralDistance) * Math.cos(targetAngleRad),
      y: centralArt.y + Number(centralDistance) * Math.sin(targetAngleRad)
    };

    const updatedArtillery = artillery.map(art => {
      if (art.isCentral) return { ...art, correction: { distance: 0, azimuth: 0 } };

   
      const dx = targetPoint.x - art.x;
      const dy = targetPoint.y - art.y;


      const distance = Math.sqrt(dx * dx + dy * dy);

      
      let azimuth = 90 - (Math.atan2(dy, dx) * 180 / Math.PI);
      while (azimuth < 0) azimuth += 360;
      while (azimuth >= 360) azimuth -= 360;

      
      const distanceCorrection = distance - Number(centralDistance);
      let azimuthCorrection = azimuth - Number(centralAzimuth);

    
      if (azimuthCorrection > 180) azimuthCorrection -= 360;
      if (azimuthCorrection < -180) azimuthCorrection += 360;

      return {
        ...art,
        correction: {
          distance: Math.round(distanceCorrection * 10) / 10,
          azimuth: Math.round(azimuthCorrection * 10) / 10
        }
      };
    });

    setArtillery(updatedArtillery);


    setGroupHistory(prev => [{
      timestamp: Date.now(),
      settings: {
        centralDistance,
        centralAzimuth,
        artillery: [...artillery]
      },
      result: updatedArtillery
    }, ...prev]);
  };

  return (
    <div className="space-y-4 text-[#8B7355]">
    
      <div className="p-4 bg-[#4A3C2E] rounded-lg border border-[#6B4423] mb-4">
        <p className="text-sm whitespace-pre-line">
          {t('groupFireInstructions')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">{t('centralDistance')} ({t('meters')})</label>
          <input
            type="number"
            value={centralDistance}
            onChange={(e) => setCentralDistance(normalizeDistance(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t('centralAzimuth')} ({t('degrees')})</label>
          <input
            type="number"
            value={centralAzimuth}
            onChange={(e) => setCentralAzimuth(normalizeAzimuth(e.target.value))}
            className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded pr-8 relative"
            min="0"
            max="359"
          />
        </div>
      </div>


      <div className="relative w-full h-[500px] bg-[#2E2420] border border-[#4A3C2E] rounded overflow-hidden select-none">

        <svg
          ref={svgRef}
          viewBox={`-${GRID_PADDING} -${GRID_PADDING} ${GRID_SIZE_X + GRID_PADDING * 2} ${GRID_SIZE_Y + GRID_PADDING * 2}`}
          className="w-full h-full cursor-crosshair"
          onClick={handleGridClick}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
   
          <rect
            x="0"
            y="0"
            width={GRID_SIZE_X}
            height={GRID_SIZE_Y}
            fill="#2E2420"
          />

         
          {[...Array(Math.floor(GRID_SIZE_X / 5) + 1)].map((_, i) => (
            <g key={`v-major-${i}`}>
              <line
                x1={i * 5}
                y1="0"
                x2={i * 5}
                y2={GRID_SIZE_Y}
                stroke="#4A3C2E"
                strokeWidth="0.15"
              />
            
              <text
                x={i * 5}
                y={GRID_SIZE_Y + 1.5}
                fontSize="1.2"
                fill="#8B7355"
                textAnchor="middle"
              >
                {i * 5}
              </text>
            </g>
          ))}
          {[...Array(Math.floor(GRID_SIZE_Y / 5) + 1)].map((_, i) => (
            <g key={`h-major-${i}`}>
              <line
                x1="0"
                y1={GRID_SIZE_Y - i * 5}
                x2={GRID_SIZE_X}
                y2={GRID_SIZE_Y - i * 5}
                stroke="#4A3C2E"
                strokeWidth="0.15"
              />
         
              <text
                x="-1"
                y={GRID_SIZE_Y - i * 5}
                fontSize="1.2"
                fill="#8B7355"
                dominantBaseline="middle"
                textAnchor="end"
              >
                {i * 5}
              </text>
            </g>
          ))}

    
          {[...Array(GRID_SIZE_X + 1)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i}
              y1="0"
              x2={i}
              y2={GRID_SIZE_Y}
              stroke="#4A3C2E"
              strokeWidth="0.05"
              strokeOpacity="0.3"
            />
          ))}
          {[...Array(GRID_SIZE_Y + 1)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={GRID_SIZE_Y - i}
              x2={GRID_SIZE_X}
              y2={GRID_SIZE_Y - i}
              stroke="#4A3C2E"
              strokeWidth="0.05"
              strokeOpacity="0.3"
            />
          ))}



 
          {artillery.map((art1, i) =>
            artillery.slice(i + 1).map(art2 => {
              const distance = calculateDistance(art1, art2);
              const midX = (art1.x + art2.x) / 2;
             
              const y1 = GRID_SIZE_Y - art1.y;
              const y2 = GRID_SIZE_Y - art2.y;
              const midY = (y1 + y2) / 2;
              const angle = Math.atan2(y2 - y1, art2.x - art1.x);

              
              const labelOffset = 0.7;
              const textX = midX + Math.sin(angle) * labelOffset;
              const textY = midY - Math.cos(angle) * labelOffset;

              return (
                <g key={`${art1.id}-${art2.id}`}>
                  <line
                    x1={art1.x}
                    y1={GRID_SIZE_Y - art1.y}  
                    x2={art2.x}
                    y2={GRID_SIZE_Y - art2.y}  
                    stroke="#4A3C2E"
                    strokeWidth="0.1"
                    strokeDasharray="0.3"
                  />
          
                  <rect
                    x={textX - 2}
                    y={textY - 0.7}
                    width="4"
                    height="1.4"
                    fill="#2E2420"
                    fillOpacity="0.9"
                    rx="0.2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fontSize="1.2"
                    fill="#8B7355"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {distance}м
                  </text>
                </g>
              );
            })
          )}

        
          {artillery.map((art, index) => {
            const artNumber = getArtilleryNumber(artillery, index);
            return (
              <g
                key={art.id}
                transform={`translate(${art.x} ${GRID_SIZE_Y - art.y})`}
                onMouseDown={(e) => handleDragStart(e, art)}
                onMouseEnter={(e) => {
                  const timeoutId = setTimeout(() => {
                    setMousePos({ x: e.clientX, y: e.clientY });
                    setHoveredArt(art);
                  }, 800);
                  setTooltipTimer(timeoutId);
                }}
                onMouseLeave={() => {
                  if (tooltipTimer) {
                    clearTimeout(tooltipTimer);
                    setTooltipTimer(null);
                  }
                  setHoveredArt(null);
                }}
                className="cursor-move"
                style={{ cursor: 'move' }}
              >

             
                <circle
                  r="1"
                  fill="#2E2420"
                  stroke="#4A3C2E"
                  strokeWidth="0.2"
                />
          
                <circle
                  r="0.7"
                  fill={art.isCentral ? "#FF4444" : "#6B4423"}
                  stroke="#4A3C2E"
                  strokeWidth="0.15"
                />
           
                <text
                  x="0"
                  y="0.4"
                  fontSize="1"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {artNumber}
                </text>

  
                {art.isCentral && (
                  <g transform={`rotate(${centralAzimuth})`}>
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="-4"
                      stroke="#FF4444"
                      strokeWidth="0.2"
                    />
                    <polygon
                      points="0,-4 -0.4,-3 0.4,-3"
                      fill="#FF4444"
                    />
                  </g>
                )}
              </g>
            );
          })}


        </svg>

        {hoveredArt && (
          <div
            className={`
      fixed z-50 
      bg-[#1A1614] 
      border border-[#4A3C2E] 
      rounded-lg shadow-lg 
      p-2 
      pointer-events-none 
      transition-all 
      duration-500 
      ease-in-out
      ${hoveredArt ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y - 10}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="text-[#8B7355] text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span>X: {hoveredArt.x}{t('meters')}</span>
                <span>Y: {hoveredArt.y}{t('meters')}</span>
              </div>
              {hoveredArt.isCentral && (
                <div className="mt-1 text-[#FF4444]">
                  {t('centralArtillery')}
                </div>
              )}
            </div>

            <div
              className="absolute w-2 h-2 bg-[#1A1614] border-r border-b border-[#4A3C2E] transform rotate-45"
              style={{
                bottom: '-5px',
                left: '50%',
                marginLeft: '-5px'
              }}
            />
          </div>
        )}

  
        <div className="absolute bottom-1 left-1 text-xs text-[#8B7355] bg-[#2E2420] px-2 py-1 rounded opacity-80">
          {t('gridScale')}
        </div>
      </div>



      <button
        onClick={calculateCorrections}
        className="w-full p-2 bg-[#4A3C2E] text-[#8B7355] rounded-lg hover:bg-[#6B4423]"
      >
        {t('calculateGroup')}
      </button>


      {artillery.length > 0 && (
        <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
          <h3 className="font-medium mb-2">{t('artilleryCorrections')}:</h3>
          <div className="space-y-2">
            {artillery.map((art, index) => {
              const artNumber = getArtilleryNumber(artillery, index);
              return (
                <div key={art.id} className="flex justify-between items-center">
                  <span>
                    {t('artillery')} #{artNumber} {art.isCentral && `(${t('central')})`}:
                  </span>
                  <span>
                    {art.isCentral ? t('noCorrections') :
                      `${t('distance')}: ${art.correction.distance > 0 ? "+" : ""}${art.correction.distance}${t('meters')}, 
                 ${t('azimuth')}: ${art.correction.azimuth > 0 ? "+" : ""}${art.correction.azimuth}°`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


const AnimatedText = ({ text }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalLength = text.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalLength);
    }, 300);

    return () => clearInterval(interval);
  }, [totalLength]);

  return (

    <div className="relative z-10 text-center font-bold text-lg text-[#8B7355]">
      <div className="inline-flex flex-wrap justify-center gap-x-2">
        {text.split(' ').map((word, wordIndex, wordArray) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => {
              let absoluteIndex = wordArray
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.length, 0) + charIndex;

              absoluteIndex += wordIndex;

              return (
                <span
                  key={charIndex}
                  className={`inline-block transition-all duration-500 ease-in-out ${absoluteIndex === activeIndex ? 'transform -translate-y-2' : ''
                    }`}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
};


const MadeByText = () => (
  <div className="relative">

    <svg
      width="320"  
      height="60"
      viewBox="0 0 320 60"  
      className="drop-shadow-md"
    >

      <path
        d="M 0,10 
           Q 0,0 10,0
           H 280        
           L 310,30     
           L 280,60     
           H 10
           Q 0,60 0,50
           V 10
           Z"
        fill="#1A1614"
      />


      <path
        d="M 10,2
           H 278.5      
           L 308.5,30   
           L 278.5,58   
           H 10
           Q 2,58 2,50
           V 10
           Q 2,2 10,2"
        stroke="#4A3C2E"
        strokeWidth="2"
        fill="none"
      />
    </svg>

   
    <div className="absolute inset-0 flex items-center pl-5">
      <span className="text-[#8B7355] text-xl font-bold whitespace-nowrap">
        MADE BY THIS MADMAN
      </span>
    </div>
  </div>
);

const SpeechBubble = ({ text = "", className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="relative">
        <svg
          viewBox="0 0 300 80"
          className="w-full h-full fill-[#1A1614]"
        >

        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full px-8">
            
            <div className="relative p-6 rounded-xl whitespace-normal" style={{ wordSpacing: '0.25em' }}>
              <div className="absolute inset-0 rounded-xl border-2 border-[#4A3C2E]" />

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8B7355] rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#8B7355] rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#8B7355] rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#8B7355] rounded-br-xl" />

              <AnimatedText text={text} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ContactBlock = () => (
  <div className="mt-8 bg-black rounded-lg p-8">
    <div className="flex items-center justify-between gap-12">
   
      <MadeByText />

     
      <div className="flex-shrink-0 relative z-10">
        <a
          href="https://steamcommunity.com/profiles/76561198208667549/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer block transition-transform hover:scale-105 duration-300"
        >
          <img
            src="/buckshot_Dealer_2.png"
            alt="Dealer with Mortar"
            className="w-[146px] h-[175px] object-contain"
          />
        </a>
      </div>

     
      <div className="flex-grow max-w-xl">
        <SpeechBubble
          text="I INSERT THE MORTAR SHELLS IN AN UNKNOWN ORDER"
          className="w-full"
        />
      </div>
    </div>
  </div>
);


const ShotHistory = ({ history, mode }) => {
  const { t } = useLanguage();
  const downloadHistory = () => {
    const chronologicalHistory = [...history].reverse();

    const text = chronologicalHistory.map((shot, index) => {
      let content = `\n=== ${t('shot')} #${index + 1} ===\n`;

      if (mode === 'direct') {
        content += `${t('mode')}: ${t('directMode')}\n`;
        content += `${t('artillery')}: ${shot.settings.artilleryDistance}${t('meters')} / ${shot.settings.artilleryAzimuth}°\n`;
        content += `${t('target')}: ${shot.settings.targetDistance}${t('meters')} / ${shot.settings.targetAzimuth}°\n`;
        content += `${t('windLevel')}: ${shot.settings.windLevel}, ${t('windDirection')} ${shot.settings.windDirection}°\n`;
        content += `${t('result')}: ${t('distance')} ${shot.result.adjustedDistance}${t('meters')}, ${t('azimuth')} ${shot.result.adjustedAzimuth}°\n`;
      }
      else if (mode === 'triangulation') {
        content += `${t('mode')}: ${t('triangulationMode')}\n`;
        content += `${t('target')}: ${shot.settings.targetDistance}${t('meters')} / ${shot.settings.targetAzimuth}°\n`;
        content += `${t('impact')}: ${shot.settings.impactDistance}${t('meters')} / ${shot.settings.impactAzimuth}°\n`;
        content += `${t('corrections')}: ${t('distance')} ${shot.result.finalCorrection.distance}${t('meters')}, ${t('azimuth')} ${shot.result.finalCorrection.azimuth}°\n`;
      }
      else if (mode === 'group') {
        content += `${t('mode')}: ${t('groupMode')}\n`;
        content += `${t('centralArtillery')}: ${t('distance')} ${shot.settings.centralDistance}${t('meters')}, ${t('azimuth')} ${shot.settings.centralAzimuth}°\n\n`;

        shot.settings.artillery.forEach((art, artIndex) => {
          const artNum = shot.result[artIndex];
          if (art.isCentral) {
            content += `* ${t('centralArtillery')} (№1)\n`;
            content += `  ${t('coordinates')}:\n`;
            content += `    X: ${art.x}${t('meters')}\n`;
            content += `    Y: ${art.y}${t('meters')}\n`;
            content += `  ${t('noCorrections')}\n`;
          } else {
            content += `* ${t('artillery')} #${artIndex + 1}\n`;
            content += `  ${t('coordinates')}:\n`;
            content += `    X: ${art.x}${t('meters')}\n`;
            content += `    Y: ${art.y}${t('meters')}\n`;
            content += `  ${t('corrections')}:\n`;
            content += `    ${t('distance')}: ${artNum.correction.distance > 0 ? "+" : ""}${artNum.correction.distance}${t('meters')}\n`;
            content += `    ${t('azimuth')}: ${artNum.correction.azimuth > 0 ? "+" : ""}${artNum.correction.azimuth}°\n`;
          }
          content += `\n`;
        });
      }

      return content;
    }).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `artillery_history_${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-[#8B7355]">{t('shotHistory')}:</h3>
        <button
          onClick={downloadHistory}
          className="px-4 py-2 bg-[#4A3C2E] text-[#8B7355] rounded hover:bg-[#6B4423]"
        >
          {t('downloadHistory')}
        </button>
      </div>
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {history.map((shot, index) => (
          <div
            key={index}
            className="p-3 bg-[#1A1614] rounded border border-[#4A3C2E]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-[#8B7355]">
                {t('shot')} #{history.length - index}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(shot.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-[#8B7355]">
              {mode === 'direct' && (
                <>
                  <p>{t('artillery')}: {shot.settings.artilleryDistance}{t('meters')} / {shot.settings.artilleryAzimuth}°</p>
                  <p>{t('target')}: {shot.settings.targetDistance}{t('meters')} / {shot.settings.targetAzimuth}°</p>
                  <p>{t('result')}: {shot.result.adjustedDistance}{t('meters')} / {shot.result.adjustedAzimuth}°</p>
                </>
              )}
              {mode === 'triangulation' && (
                <>
                  <p>{t('target')}: {shot.settings.targetDistance}{t('meters')} / {shot.settings.targetAzimuth}°</p>
                  <p>{t('impact')}: {shot.settings.impactDistance}{t('meters')} / {shot.settings.impactAzimuth}°</p>
                  <p>{t('corrections')}: {shot.result.finalCorrection.distance}{t('meters')} / {shot.result.finalCorrection.azimuth}°</p>
                </>
              )}
              {mode === 'group' && (
                <>
                  <p className="text-[#8B7355] font-medium">
                    {t('centralArtillery')}: {shot.settings.centralDistance}{t('meters')} / {shot.settings.centralAzimuth}°
                  </p>
                  <div className="mt-2 space-y-2">
                    {shot.settings.artillery.map((art, artIndex) => {
                      const artNum = shot.result[artIndex];
                      const isCenter = art.isCentral;

                      return (
                        <div key={art.id} className="text-sm text-[#8B7355] pl-4 border-l border-[#4A3C2E]">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {isCenter ? t('centralArtillery') : `${t('artillery')} #${artIndex + 1}`}:
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-1 mt-1">
                            <div className="grid grid-cols-2 gap-2">
                              <span>X: {art.x}{t('meters')}</span>
                              <span>Y: {art.y}{t('meters')}</span>
                            </div>
                            {!isCenter && (
                              <div className="grid grid-cols-2 gap-2">
                                <span>{t('distance')}: {artNum.correction.distance > 0 ? "+" : ""}
                                  {artNum.correction.distance}{t('meters')}
                                </span>
                                <span>{t('azimuth')}: {artNum.correction.azimuth > 0 ? "+" : ""}
                                  {artNum.correction.azimuth}°
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArtilleryCalculator = () => {
  const { t } = useLanguage();
  const [calculatorMode, setCalculatorMode] = useState('direct');
  const [artilleryDistance, setArtilleryDistance] = useState('100');
  const [artilleryAzimuth, setArtilleryAzimuth] = useState('180');
  const [targetDistance, setTargetDistance] = useState('80');
  const [targetAzimuth, setTargetAzimuth] = useState('90');
  const [windLevel, setWindLevel] = useState('0');
  const [windDirection, setWindDirection] = useState('0');
  const [artilleryType, setArtilleryType] = useState('120');
  const [result, setResult] = useState(null);
  const [directHistory, setDirectHistory] = useState([]);
  const [triangulationHistory, setTriangulationHistory] = useState([]);
  const [groupHistory, setGroupHistory] = useState([]);

  const ARTILLERY_DEVIATION_PER_LEVEL = {
    '120': 10,
    '150': 10,
    'rocket': 10,
    '300': 50
  };

  function polarToCartesian(distance, azimuth) {
    const angleRad = (90 - azimuth) * Math.PI / 180;
    const x = distance * Math.cos(angleRad);
    const y = distance * Math.sin(angleRad);
    return { x, y };
  }

  function cartesianToPolar(x, y) {
    const distance = Math.sqrt(x * x + y * y);
    let azimuth = 90 - (Math.atan2(y, x) * 180 / Math.PI);
    if (azimuth < 0) azimuth += 360;
    return { distance, azimuth };
  }

  function calculateWindEffect(shellAzimuth, windDirection, windLevel) {
    if (windLevel === '0') return { range: 0, deflection: 0 };

    const baseDeviation = ARTILLERY_DEVIATION_PER_LEVEL[artilleryType];
    const totalDeviation = baseDeviation * Number(windLevel);

    let relativeAngle = ((windDirection - shellAzimuth + 180 + 360) % 360) * Math.PI / 180;

    return {
      range: totalDeviation * Math.cos(relativeAngle),
      deflection: totalDeviation * Math.sin(relativeAngle)
    };
  }

  function calculateFiringData() {
    const artillery = polarToCartesian(Number(artilleryDistance), Number(artilleryAzimuth));
    const target = polarToCartesian(Number(targetDistance), Number(targetAzimuth));

    const vectorToTarget = {
      x: target.x - artillery.x,
      y: target.y - artillery.y
    };

    const baseParams = cartesianToPolar(vectorToTarget.x, vectorToTarget.y);

    const windEffect = calculateWindEffect(baseParams.azimuth, Number(windDirection), windLevel);

    const adjustedDistance = baseParams.distance + windEffect.range;

    const adjustedAzimuth = baseParams.azimuth +
      Math.atan2(windEffect.deflection, baseParams.distance) * 180 / Math.PI;

    const calculatedResult = {
      baseDistance: Math.round(baseParams.distance * 10) / 10,
      baseAzimuth: Math.round(baseParams.azimuth * 10) / 10,
      windRangeEffect: Math.round(windEffect.range * 10) / 10,
      windDeflectionEffect: Math.round(windEffect.deflection * 10) / 10,
      adjustedDistance: Math.round(adjustedDistance * 10) / 10,
      adjustedAzimuth: Math.round(adjustedAzimuth * 10) / 10
    };

    setResult(calculatedResult);


    setDirectHistory(prev => [{
      timestamp: Date.now(),
      settings: {
        artilleryDistance,
        artilleryAzimuth,
        targetDistance,
        targetAzimuth,
        windLevel,
        windDirection,
        artilleryType
      },
      result: calculatedResult
    }, ...prev]);
  }



  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t('title')}</CardTitle>
          <LanguageSwitcher />
        </div>
       
        <div className="mt-4 w-full grid grid-cols-3 gap-4">
          <button
            onClick={() => setCalculatorMode('direct')}
            className={`px-6 py-3 rounded-lg font-bold text-lg relative
      transition-all duration-300 ease-in-out
      border-2 
      ${calculatorMode === 'direct'
                ? 'bg-[#4A3C2E] text-[#8B7355] border-[#8B7355] shadow-lg transform scale-105'
                : 'bg-[#2E2420] text-[#4A3C2E] border-[#4A3C2E] hover:bg-[#3E342E] hover:text-[#8B7355] hover:border-[#6B4423] hover:scale-102'
              }
      before:content-[""] before:absolute before:inset-0 before:border-2 before:border-[#6B4423] before:rounded-lg
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-100
    `}
          >
            <span className="relative z-10 text-shadow">{t('directMode')}</span>
          </button>

          <button
            onClick={() => setCalculatorMode('triangulation')}
            className={`px-6 py-3 rounded-lg font-bold text-lg relative
      transition-all duration-300 ease-in-out
      border-2 
      ${calculatorMode === 'triangulation'
                ? 'bg-[#4A3C2E] text-[#8B7355] border-[#8B7355] shadow-lg transform scale-105'
                : 'bg-[#2E2420] text-[#4A3C2E] border-[#4A3C2E] hover:bg-[#3E342E] hover:text-[#8B7355] hover:border-[#6B4423] hover:scale-102'
              }
      before:content-[""] before:absolute before:inset-0 before:border-2 before:border-[#6B4423] before:rounded-lg
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-100
    `}
          >
            <span className="relative z-10 text-shadow">{t('triangulationMode')}</span>
          </button>

          <button
            onClick={() => setCalculatorMode('group')}
            className={`px-6 py-3 rounded-lg font-bold text-lg relative
      transition-all duration-300 ease-in-out
      border-2 
      ${calculatorMode === 'group'
                ? 'bg-[#4A3C2E] text-[#8B7355] border-[#8B7355] shadow-lg transform scale-105'
                : 'bg-[#2E2420] text-[#4A3C2E] border-[#4A3C2E] hover:bg-[#3E342E] hover:text-[#8B7355] hover:border-[#6B4423] hover:scale-102'
              }
      before:content-[""] before:absolute before:inset-0 before:border-2 before:border-[#6B4423] before:rounded-lg
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-100
    `}
          >
            <span className="relative z-10 text-shadow">{t('groupMode')}</span>
          </button>
        </div>

      </CardHeader>
      <CardContent>
        {calculatorMode === 'direct' ? (
          <div className="space-y-4 text-[#8B7355]">
            <div className="space-y-4 text-[#8B7355]">
              <div className="p-4 bg-[#4A3C2E] rounded-lg border border-[#6B4423]">
                <p className="text-sm whitespace-pre-line">
                  {t('directFireInstructions')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium"> {t('artilleryDistance')} ({t('meters')})</label>
                  <input
                    type="number"
                    value={artilleryDistance}
                    onChange={(e) => setArtilleryDistance(normalizeDistance(e.target.value))}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] focus:ring-1 focus:ring-[#6B4423] 
                       text-[#8B7355] placeholder-[#4A3C2E] pr-8 relative"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">{t('artilleryAzimuth')} ({t('degrees')})</label>
                  <input
                    type="number"
                    value={artilleryAzimuth}
                    onChange={(e) => setArtilleryAzimuth(normalizeAzimuth(e.target.value))}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] focus:ring-1 focus:ring-[#6B4423] 
                       text-[#8B7355] placeholder-[#4A3C2E] pr-8 relative"
                    min="0"
                    max="359"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">{t('targetDistance')} ({t('meters')})</label>
                  <input
                    type="number"
                    value={targetDistance}
                    onChange={(e) => setTargetDistance(normalizeDistance(e.target.value))}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] focus:ring-1 focus:ring-[#6B4423] 
                       text-[#8B7355] placeholder-[#4A3C2E] pr-8 relative"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">{t('targetAzimuth')} ({t('degrees')})</label>
                  <input
                    type="number"
                    value={targetAzimuth}
                    onChange={(e) => setTargetAzimuth(normalizeAzimuth(e.target.value))}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] focus:ring-1 focus:ring-[#6B4423] 
                       text-[#8B7355] placeholder-[#4A3C2E] pr-8 relative"
                    min="0"
                    max="359"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#4A3C2E]">
                <div>
                  <label className="block text-sm font-medium"> {t('artilleryType')} </label>
                  <select
                    value={artilleryType}
                    onChange={(e) => setArtilleryType(e.target.value)}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] text-[#8B7355]"
                  >
                    <option value="120">{t('type120mm')}</option>
                    <option value="150">{t('type150mm')}</option>
                    <option value="rocket">{t('typeRocket')}</option>
                    <option value="300">{t('type300mm')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium"> {t('windLevel')} </label>
                  <select
                    value={windLevel}
                    onChange={(e) => setWindLevel(e.target.value)}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] text-[#8B7355]"
                  >
                    <option value="0">{t('noWind')}</option>
                    <option value="1">{t('level1')}</option>
                    <option value="2">{t('level2')}</option>
                    <option value="3">{t('level3')}</option>
                    <option value="4">{t('level4')}</option>
                    <option value="5">{t('level5')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium"> {t('windDirection')} ({t('degrees')}) </label>
                  <input
                    type="number"
                    value={windDirection}
                    onChange={(e) => setWindDirection(normalizeAzimuth(e.target.value))}
                    className="w-full p-2 bg-[#2E2420] border border-[#4A3C2E] rounded 
                       focus:border-[#6B4423] focus:ring-1 focus:ring-[#6B4423] 
                       text-[#8B7355] placeholder-[#4A3C2E] pr-8 relative"
                    min="0"
                    max="359"
                  />
                </div>
              </div>

              <button
                onClick={calculateFiringData}
                className="w-full p-2 bg-[#4A3C2E] text-[#8B7355] rounded-lg 
                       hover:bg-[#6B4423] transition-colors font-medium"
              >
                {t('calculate')}
              </button>

              {result && (
                <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
                  <h3 className="font-medium">{t('setOnArtillery')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t('baseParameters')}</p>
                      <p>{t('distance')}: {result.baseDistance} {t('meters')}</p>
                      <p>{t('azimuth')}: {result.baseAzimuth}{t('degrees')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('windCorrections')}</p>
                      <p>{t('rangeCorrection')}: {result.windRangeEffect} {t('meters')}</p>
                      <p>{t('deflectionCorrection')}: {result.windDeflectionEffect} {t('meters')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('finalParameters')}</p>
                      <p>{t('distance')}: {result.adjustedDistance} {t('meters')}</p>
                      <p>{t('azimuth')}: {result.adjustedAzimuth}{t('degrees')}</p>
                    </div>
                  </div>


                  <WindIndicator
                    windDirection={Number(windDirection)}
                    shellAzimuth={result.baseAzimuth}
                  />

                  <BattlefieldMap
                    artilleryDistance={artilleryDistance}
                    artilleryAzimuth={artilleryAzimuth}
                    targetDistance={targetDistance}
                    targetAzimuth={targetAzimuth}
                    result={result}
                  />

                </div>
              )}

              <ShotHistory history={directHistory} mode="direct" />

              <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
                <h3 className="font-medium mb-2">{t('windDeviation')}</h3>
                <p className="text-sm">
                  {t('deviationNote')}<br />
                  • 120mm: 10 {t('meters')} ({t('maximum')} 50 {t('meters')})<br />
                  • 150mm: 10 {t('meters')} ({t('maximum')} 50 {t('meters')})<br />
                  • Rocket Artillery: 10 {t('meters')} ({t('maximum')} 50 {t('meters')})<br />
                  • 300mm: 50 {t('meters')} ({t('maximum')} 250 {t('meters')})<br />
                  <br />
                  {t('windEffectNote')}<br />
                  {t('windDirections')}
                </p>
              </div>

              <div className="mt-4 p-4 bg-[#2E2420] rounded-lg border border-[#4A3C2E]">
                <h3 className="font-medium mb-4">{t('windLevelGuide')}</h3>
                <WindLevelGuide />
              </div>

              <ContactBlock />
            </div>
          </div>
        ) : calculatorMode === 'triangulation' ? (
          <>
            <TriangulationCalculator setTriangulationHistory={setTriangulationHistory} />
            <ShotHistory history={triangulationHistory} mode="triangulation" />
            <CommonBottomBlocks />
          </>
        ) : (
          <>
            <ArtilleryGroupCalculator setGroupHistory={setGroupHistory} />
            <ShotHistory history={groupHistory} mode="group" />
            <CommonBottomBlocks />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtilleryCalculator;