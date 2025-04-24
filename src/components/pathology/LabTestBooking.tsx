
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileText, Microscope } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const labTests = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    price: 40,
    category: "Hematology",
    preparation: "No special preparation required",
  },
  {
    id: "lipid",
    name: "Lipid Profile",
    price: 55,
    category: "Chemistry",
    preparation: "Fast for 12 hours before the test",
  },
  {
    id: "thyroid",
    name: "Thyroid Function Panel",
    price: 80,
    category: "Endocrinology",
    preparation: "No special preparation required",
  },
  {
    id: "liver",
    name: "Liver Function Test",
    price: 65,
    category: "Chemistry",
    preparation: "Fast for 8 hours before the test",
  },
  {
    id: "kidney",
    name: "Kidney Function Panel",
    price: 60,
    category: "Chemistry",
    preparation: "Drink plenty of water before the test",
  },
];

const LabTestBooking = () => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  
  const toggleTestSelection = (testId: string) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(id => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };
  
  const totalPrice = selectedTests.reduce((total, testId) => {
    const test = labTests.find(test => test.id === testId);
    return total + (test?.price || 0);
  }, 0);

  const handleBooking = () => {
    console.log("Booking tests:", {
      tests: selectedTests.map(id => labTests.find(test => test.id === id)?.name),
      date: date ? format(date, "PPP") : null,
      timeSlot,
    });
    // In a real app, this would submit the booking to an API
    alert("Lab tests booked successfully! You will receive a confirmation email shortly.");
  };

  return (
    <Card>
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="flex items-center text-medical-darkblue">
          <Microscope className="mr-2 h-5 w-5" />
          Pathology Lab Tests
        </CardTitle>
        <CardDescription>
          Book diagnostic tests and receive AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="font-medium mb-3">1. Select Tests</h3>
          <div className="space-y-2">
            {labTests.map((test) => (
              <div 
                key={test.id}
                className={`border rounded-md p-4 cursor-pointer transition-colors ${
                  selectedTests.includes(test.id)
                    ? "border-medical-blue bg-medical-lightblue bg-opacity-20"
                    : "hover:border-gray-400"
                }`}
                onClick={() => toggleTestSelection(test.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-medical-blue" />
                      {test.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{test.preparation}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      {test.category}
                    </Badge>
                    <p className="text-lg font-semibold mt-1">${test.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-3">2. Select Date</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">3. Select Time</h3>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Pick a time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00">8:00 AM - 9:00 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM - 10:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM - 11:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM - 12:00 PM</SelectItem>
                <SelectItem value="13:00">1:00 PM - 2:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM - 3:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM - 4:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM - 5:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Summary</h3>
              <p className="text-sm text-gray-600">
                {selectedTests.length} test{selectedTests.length !== 1 ? "s" : ""} selected
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-medical-blue hover:bg-medical-darkblue"
            disabled={selectedTests.length === 0 || !date || !timeSlot}
            onClick={handleBooking}
          >
            Book Tests
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabTestBooking;
