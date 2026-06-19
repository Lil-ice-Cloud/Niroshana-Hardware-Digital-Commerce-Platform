"use client";

import React, { useState, useEffect, useRef } from "react";

interface PriceRangeSliderProps {
    minLimit?: number;
    maxLimit?: number;
    step?: number;
    onChange?: (min: number, max: number) => void;
}

export default function PriceRangeSlider({
                                             minLimit = 0,
                                             maxLimit = 1000,
                                             step = 10,
                                             onChange,
                                         }: PriceRangeSliderProps) {
    const [minVal, setMinVal] = useState(minLimit);
    const [maxVal, setMaxVal] = useState(maxLimit);

    const minValRef = useRef(minLimit);
    const maxValRef = useRef(maxLimit);
    const rangeRef = useRef<HTMLDivElement>(null);

    // Convert to percentage for the visual track width
    const getPercent = (value: number) =>
        Math.round(((value - minLimit) / (maxLimit - minLimit)) * 100);

    // Adjust the visual track width when min value changes
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (rangeRef.current) {
            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal]);

    // Adjust the visual track width when max value changes
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (rangeRef.current) {
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal]);

    // Send updates to the parent component
    useEffect(() => {
        if (onChange) {
            onChange(minVal, maxVal);
        }
    }, [minVal, maxVal, onChange]);

    // Handle number input changes with validation
    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(minLimit, Math.min(Number(e.target.value), maxVal - step));
        setMinVal(value);
        minValRef.current = value;
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(maxLimit, Math.max(Number(e.target.value), minVal + step));
        setMaxVal(value);
        maxValRef.current = value;
    };

    return (
        <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Price Range</h3>

            {/* Double Slider Container */}
            <div className="relative h-6 flex items-center mb-8">
                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={minVal}
                    step={step}
                    onChange={(e) => {
                        const value = Math.min(Number(e.target.value), maxVal - step);
                        setMinVal(value);
                        minValRef.current = value;
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 accent-blue-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                />
                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={maxVal}
                    step={step}
                    onChange={(e) => {
                        const value = Math.max(Number(e.target.value), minVal + step);
                        setMaxVal(value);
                        maxValRef.current = value;
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 accent-blue-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                />

                {/* Custom Visual Track */}
                <div className="relative w-full h-1 bg-gray-200 rounded">
                    <div
                        ref={rangeRef}
                        className="absolute h-1 bg-blue-600 rounded"
                    />
                </div>
            </div>

            {/* Min & Max Number Inputs */}
            <div className="flex items-center gap-4">
                <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Min Price</label>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400">$</span>
                        <input
                            type="number"
                            value={minVal}
                            onChange={handleMinInputChange}
                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="text-gray-400 mt-5 font-bold">to</div>

                <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Max Price</label>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400">$</span>
                        <input
                            type="number"
                            value={maxVal}
                            onChange={handleMaxInputChange}
                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
