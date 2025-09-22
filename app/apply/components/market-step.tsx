"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MarketStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function MarketStep({ data, updateData, errors }: MarketStepProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="marketSize">Market Size Estimation *</Label>
        <Textarea
          id="marketSize"
          placeholder="Estimate your Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM). Include numbers and sources if available."
          value={data.marketSize || ""}
          onChange={(e) => handleChange("marketSize", e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">Provide market size estimates with reasoning and data sources.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetMarket">Primary Target Market *</Label>
        <Input
          id="targetMarket"
          placeholder="e.g., Ethiopian SMEs with 10-50 employees, University students aged 18-25"
          value={data.targetMarket || ""}
          onChange={(e) => handleChange("targetMarket", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="marketTrends">Market Trends & Opportunities</Label>
        <Textarea
          id="marketTrends"
          placeholder="What trends in your market create opportunities for your solution? Include growth rates, regulatory changes, or technological shifts."
          value={data.marketTrends || ""}
          onChange={(e) => handleChange("marketTrends", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitors">Competitive Landscape *</Label>
        <Textarea
          id="competitors"
          placeholder="Who are your main competitors? How do you differentiate from them? Include both direct and indirect competitors."
          value={data.competitors || ""}
          onChange={(e) => handleChange("competitors", e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerAcquisition">Customer Acquisition Strategy *</Label>
        <Textarea
          id="customerAcquisition"
          placeholder="How will you reach and acquire customers? What channels will you use?"
          value={data.customerAcquisition || ""}
          onChange={(e) => handleChange("customerAcquisition", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="revenueModel">Revenue Model *</Label>
        <Select value={data.revenueModel || ""} onValueChange={(value) => handleChange("revenueModel", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your revenue model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subscription">Subscription (SaaS)</SelectItem>
            <SelectItem value="transaction">Transaction Fees</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="one-time">One-time Purchase</SelectItem>
            <SelectItem value="advertising">Advertising</SelectItem>
            <SelectItem value="commission">Commission-based</SelectItem>
            <SelectItem value="licensing">Licensing</SelectItem>
            <SelectItem value="marketplace">Marketplace Fees</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricingStrategy">Pricing Strategy</Label>
        <Textarea
          id="pricingStrategy"
          placeholder="How will you price your product/service? What factors influence your pricing decisions?"
          value={data.pricingStrategy || ""}
          onChange={(e) => handleChange("pricingStrategy", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  )
}
