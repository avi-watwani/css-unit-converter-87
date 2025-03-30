
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info, ChevronDown, ChevronUp, CopyCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedValue from './AnimatedValue';
import PixelGrid from './PixelGrid';
import UnitInfo from './UnitInfo';
import CopyButton from './CopyButton';
import UnitVisualizer from './UnitVisualizer';
import UnitRecommendation from './UnitRecommendation';
import UnitConversionTable from './UnitConversionTable';
import {
  UnitType,
  UNITS_INFO,
  convertUnits,
  formatUnitValue,
  suggestBestUnit
} from '@/lib/unitConversions';

const UnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(16);
  const [inputUnit, setInputUnit] = useState<UnitType>('px');
  const [outputUnit, setOutputUnit] = useState<UnitType>('rem');
  const [outputValue, setOutputValue] = useState<number>(1);
  const [showUnitInfo, setShowUnitInfo] = useState<UnitType | null>(null);
  const [context, setContext] = useState<string>('typography');
  const [suggestedUnit, setSuggestedUnit] = useState<UnitType | null>(null);
  const [showVisualization, setShowVisualization] = useState<boolean>(true);
  const [showConversionTable, setShowConversionTable] = useState<boolean>(false);

  const availableUnits: UnitType[] = [
    'px', 'rem', 'em', 'vh', 'vw', '%', 'vmin', 'vmax', 
    'cm', 'mm', 'in', 'pt', 'pc'
  ];

  const contexts = [
    { value: 'typography', label: 'Typography' },
    { value: 'layout', label: 'Layout' },
    { value: 'spacing', label: 'Spacing' },
    { value: 'borders', label: 'Borders' }
  ];

  useEffect(() => {
    const newOutputValue = convertUnits(inputValue, inputUnit, outputUnit);
    setOutputValue(newOutputValue);
    
    const suggested = suggestBestUnit(context, inputValue, inputUnit);
    setSuggestedUnit(suggested);
  }, [inputValue, inputUnit, outputUnit, context]);

  const fullCssValue = `${formatUnitValue(outputValue, outputUnit)}`;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        className="gradient-border rounded-2xl overflow-hidden bg-card shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-gradient-to-r from-[#8c52ff] to-[#ef33ff] p-6 text-white relative">
          <div className="absolute inset-0 backdrop-blur-sm opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-semibold mb-2">CSS Unit Converter</h1>
            <p className="text-white/80">Convert between CSS units with real-time visualization</p>
          </div>
        </div>
        
        <div className="p-6 border-b border-[#ffffff11]">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">What are you styling?</h2>
          <div className="flex flex-wrap gap-2">
            {contexts.map((ctx) => (
              <button
                key={ctx.value}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all relative",
                  context === ctx.value
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                )}
                onClick={() => setContext(ctx.value)}
              >
                {context === ctx.value && (
                  <motion.div
                    layoutId="activeContext"
                    className="absolute inset-0 bg-gradient-to-r from-[#8c52ff] to-[#ef33ff] rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {ctx.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Enter Value
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-[#ffffff15] bg-secondary focus:outline-none focus:ring-2 focus:ring-[#8c52ff] placeholder-muted-foreground/50 text-foreground"
                placeholder="Enter value"
              />
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value as UnitType)}
                  className="block w-20 pl-3 pr-8 py-1.5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent text-foreground"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit} className="bg-card text-foreground">
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => setShowVisualization(!showVisualization)}
                className={`text-sm ${showVisualization ? 'text-[#8c52ff]' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {showVisualization ? 'Hide Visualization' : 'Show Visualization'}
              </button>
            </div>
            
            <button
              onClick={() => setShowUnitInfo(inputUnit)}
              className="inline-flex items-center text-sm text-[#8c52ff] hover:text-[#ef33ff]"
            >
              <Info className="h-4 w-4 mr-1" />
              <span>About {UNITS_INFO[inputUnit].name}</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Converted Value
            </label>
            
            <div className="relative">
              <div className="flex items-center">
                <div className="flex-1 px-4 py-3 rounded-lg border border-[#ffffff15] bg-secondary">
                  <AnimatedValue
                    value={outputValue}
                    unit={outputUnit}
                    className="text-lg font-medium text-foreground"
                  />
                </div>
                
                <div className="ml-2">
                  <CopyButton value={fullCssValue} />
                </div>
              </div>
              
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <select
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value as UnitType)}
                  className="block w-20 pl-3 pr-8 py-1.5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent text-foreground"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit} className="bg-card text-foreground">
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#8c52ff] mb-2">Conversion</h3>
              <div className="flex items-center justify-center space-x-3 text-sm">
                <span className="font-mono bg-secondary px-2 py-1 rounded border border-[#ffffff15] text-foreground">
                  {formatUnitValue(inputValue, inputUnit)}
                </span>
                <ArrowRight className="h-4 w-4 text-[#ef33ff]" />
                <span className="font-mono bg-secondary px-2 py-1 rounded border border-[#ffffff15] text-foreground">
                  {formatUnitValue(outputValue, outputUnit)}
                </span>
              </div>
            </div>
            
            {suggestedUnit && suggestedUnit !== outputUnit && (
              <motion.div
                className="unit-suggestion glassmorphism rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-[#8c52ff] mb-1">Suggested Unit</h3>
                <p className="text-sm text-muted-foreground">
                  For {context}, consider using <strong className="text-[#ef33ff]">{UNITS_INFO[suggestedUnit].name}</strong> ({suggestedUnit}).
                </p>
                <button
                  onClick={() => setOutputUnit(suggestedUnit)}
                  className="mt-2 text-xs bg-gradient-to-r from-[#8c52ff] to-[#ef33ff] text-white px-3 py-1 rounded-full transition-colors"
                >
                  Convert to {suggestedUnit}
                </button>
              </motion.div>
            )}
            
            <button
              onClick={() => setShowUnitInfo(outputUnit)}
              className="inline-flex items-center text-sm text-[#8c52ff] hover:text-[#ef33ff]"
            >
              <Info className="h-4 w-4 mr-1" />
              <span>About {UNITS_INFO[outputUnit].name}</span>
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {showVisualization && (
            <motion.div 
              className="p-6 border-t border-[#ffffff11]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UnitVisualizer 
                  unitType={inputUnit === 'px' ? outputUnit : inputUnit}
                  pixelValue={inputUnit === 'px' ? inputValue : Math.round(convertUnits(inputValue, inputUnit, 'px'))}
                  context={context}
                />
                
                <UnitRecommendation 
                  context={context}
                  value={inputValue}
                  suggestedUnit={suggestedUnit || 'rem'}
                  currentUnit={outputUnit}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-6 border-t border-[#ffffff11]">
          <button
            onClick={() => setShowConversionTable(!showConversionTable)}
            className="flex items-center justify-between w-full px-4 py-3 glassmorphism rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <span className="font-medium text-foreground">CSS Unit Conversion Tables Reference</span>
            {showConversionTable ? (
              <ChevronUp className="h-5 w-5 text-[#8c52ff]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#8c52ff]" />
            )}
          </button>
          
          <AnimatePresence>
            {showConversionTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <UnitConversionTable className="glassmorphism rounded-lg p-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {showUnitInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUnitInfo(null)}
          >
            <motion.div
              className="max-w-md w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <UnitInfo unitType={showUnitInfo} unitInfo={UNITS_INFO[showUnitInfo]} />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setShowUnitInfo(null)}
                  className="text-sm bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnitConverter;
