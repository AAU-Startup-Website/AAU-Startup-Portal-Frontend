"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
  component: React.ComponentType<any>
  validation?: (data: any) => string[]
}

interface MultiStepFormProps {
  steps: Step[]
  onSubmit: (data: any) => void
  initialData?: any
}

export function MultiStepForm({ steps, onSubmit, initialData = {} }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<string[]>([])
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const updateFormData = useCallback((stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }, [])

  const validateCurrentStep = () => {
    const currentStepConfig = steps[currentStep]
    if (currentStepConfig.validation) {
      const stepErrors = currentStepConfig.validation(formData)
      setErrors(stepErrors)
      return stepErrors.length === 0
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setErrors([])
      } else {
        onSubmit(formData)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setErrors([])
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex)
      setErrors([])
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100
  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Startup Application</CardTitle>
                <p className="text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Navigation */}
      <div className="hidden md:flex justify-center">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  index === currentStep
                    ? "border-aau-blue bg-aau-blue text-white"
                    : completedSteps.has(index)
                      ? "border-green-500 bg-green-500 text-white"
                      : index < currentStep
                        ? "border-aau-blue text-aau-blue hover:bg-aau-blue hover:text-white cursor-pointer"
                        : "border-muted-foreground/30 text-muted-foreground"
                }`}
                disabled={index > currentStep && !completedSteps.has(index)}
              >
                {completedSteps.has(index) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${completedSteps.has(index) ? "bg-green-500" : "bg-muted-foreground/30"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent>
          {/* Error Display */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm text-destructive">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step Component */}
          <CurrentStepComponent data={formData} updateData={updateFormData} errors={errors} />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} className="bg-aau-blue hover:bg-aau-blue/90">
          {currentStep === steps.length - 1 ? "Submit Application" : "Next Step"}
          {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
