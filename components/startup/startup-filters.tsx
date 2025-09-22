"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, Grid, List } from "lucide-react"

interface StartupFiltersProps {
  onFiltersChange: (filters: any) => void
  onViewChange: (view: "grid" | "list") => void
  currentView: "grid" | "list"
  totalCount: number
}

export function StartupFilters({ onFiltersChange, onViewChange, currentView, totalCount }: StartupFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedMentorStatus, setSelectedMentorStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const sectors = [
    "FinTech",
    "HealthTech",
    "EdTech",
    "AgriTech",
    "E-commerce",
    "CleanTech",
    "LogisticsTech",
    "PropTech",
    "FoodTech",
    "RetailTech",
  ]

  const stages = ["Ideation", "MVP", "Early Traction", "Seed", "Series A", "Series B", "Growth"]

  const mentorStatuses = [
    { value: "mentored", label: "Has Mentor" },
    { value: "unmentored", label: "No Mentor" },
    { value: "all", label: "All Startups" },
  ]

  const handleFilterChange = () => {
    onFiltersChange({
      search: searchTerm,
      sector: selectedSector,
      stage: selectedStage,
      mentorStatus: selectedMentorStatus,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSector("all")
    setSelectedStage("all")
    setSelectedMentorStatus("all")
    onFiltersChange({})
  }

  const activeFiltersCount = [
    searchTerm,
    selectedSector !== "all",
    selectedStage !== "all",
    selectedMentorStatus !== "all",
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleFilterChange()
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <div className="flex border rounded-md">
            <Button
              variant={currentView === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Sector</label>
                <Select
                  value={selectedSector}
                  onValueChange={(value) => {
                    setSelectedSector(value)
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All sectors" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Stage</label>
                <Select
                  value={selectedStage}
                  onValueChange={(value) => {
                    setSelectedStage(value)
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All stages" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mentor Status</label>
                <Select
                  value={selectedMentorStatus}
                  onValueChange={(value) => {
                    setSelectedMentorStatus(value)
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All startups" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentorStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">{totalCount} startups found</div>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
