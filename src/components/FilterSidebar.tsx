import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterIcon, X, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIndianRupees } from "@/utils/format";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const FilterSidebar = ({ isOpen, onClose, isMobile = false }: FilterSidebarProps) => {
  const { applyFilters, resetFilters, filters } = useStore();
  
  const [localFilters, setLocalFilters] = useState({
    category: filters.category,
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 25000,
    inStock: filters.inStock
  });
  
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    availability: true
  });
  
  const categories = [
    { id: "strength", name: "Strength Equipment" },
    { id: "accessories", name: "Accessories" },
    { id: "electronics", name: "Electronics" },
    { id: "recovery", name: "Recovery" },
    { id: "nutrition", name: "Nutrition" }
  ];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? null : categoryId
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const handleInStockChange = (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setLocalFilters(prev => ({
        ...prev,
        inStock: checked ? true : null
      }));
    }
  };

  const handleApplyFilters = () => {
    applyFilters(localFilters);
    if (isMobile) onClose();
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters({
      category: null,
      minPrice: 0,
      maxPrice: 25000,
      inStock: null
    });
  };

  return (
    <div
      className={cn(
        "bg-background border-r flex flex-col transition-all duration-300 ease-in-out",
        isMobile
          ? "fixed inset-0 z-50 w-full max-w-xs transform shadow-xl"
          : "sticky top-24 h-[calc(100vh-120px)] w-64",
        isMobile && (isOpen ? "translate-x-0" : "-translate-x-full")
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-medium flex items-center">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </h3>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Category Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("categories")}
            className="flex w-full items-center justify-between mb-2"
          >
            <h4 className="font-medium">Categories</h4>
            {openSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {openSections.categories && (
            <div className="space-y-2 ml-1">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={localFilters.category === category.id}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Price Range Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex w-full items-center justify-between mb-2"
          >
            <h4 className="font-medium">Price Range</h4>
            {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {openSections.price && (
            <div className="space-y-4 mt-4 px-1">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center text-sm">
                  <IndianRupee className="h-3 w-3 mr-1" />{localFilters.minPrice}
                </span>
                <span className="flex items-center text-sm">
                  <IndianRupee className="h-3 w-3 mr-1" />{localFilters.maxPrice}
                </span>
              </div>

              <Slider
                value={[localFilters.minPrice, localFilters.maxPrice]}
                min={0}
                max={25000}
                step={1000}
                onValueChange={handlePriceChange}
                className="w-full"
              />

              <div className="bg-muted/30 rounded-md p-3 text-sm">
                <p className="font-medium mb-1">Selected Range:</p>
                <p className="flex items-center justify-center text-primary font-semibold">
                  {formatIndianRupees(localFilters.minPrice)} - {formatIndianRupees(localFilters.maxPrice)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Availability Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("availability")}
            className="flex w-full items-center justify-between mb-2"
          >
            <h4 className="font-medium">Availability</h4>
            {openSections.availability ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {openSections.availability && (
            <div className="space-y-2 ml-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={localFilters.inStock === true} onCheckedChange={handleInStockChange} />
                <label htmlFor="in-stock" className="text-sm cursor-pointer">In Stock Only</label>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t p-4 space-y-2">
        <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
        <Button onClick={handleResetFilters} variant="outline" className="w-full">Reset Filters</Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
