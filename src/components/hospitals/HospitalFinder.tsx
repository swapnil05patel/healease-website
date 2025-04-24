import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Phone, Search, Star, Leaf, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  specialties: string[];
  bedsAvailable: number;
  contactNumber: string;
  imageSrc: string;
  insuranceAccepted: string[];
  medicalSystems: string[];
  isAyushmanBharatEmpanelled: boolean;
}

const hospitals: Hospital[] = [
  {
    id: "hosp1",
    name: "Apollo Hospitals",
    address: "Plot No. 1, Film Nagar, Jubilee Hills, Hyderabad",
    distance: "3.2 km",
    rating: 4.7,
    specialties: ["Cardiology", "Neurology", "Emergency", "Oncology"],
    bedsAvailable: 15,
    contactNumber: "040-23607777",
    imageSrc: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Ayushman Bharat", "Star Health", "CGHS", "Apollo Health"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp2",
    name: "Fortis Hospital",
    address: "154/11, Bannerghatta Road, Opposite IIM-B, Bengaluru",
    distance: "5.1 km",
    rating: 4.6,
    specialties: ["Orthopedics", "Pediatrics", "General Medicine", "Gastroenterology"],
    bedsAvailable: 8,
    contactNumber: "080-66214444",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Max Bupa", "HDFC ERGO", "Bajaj Allianz", "ICICI Lombard"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp3",
    name: "AIIMS Delhi",
    address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi",
    distance: "7.4 km",
    rating: 4.8,
    specialties: ["Cardiology", "Neurology", "Oncology", "Trauma Center"],
    bedsAvailable: 20,
    contactNumber: "011-26588500",
    imageSrc: "https://images.unsplash.com/photo-1578991624414-c47aef483f89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Ayushman Bharat", "CGHS", "ECHS", "All Government Insurance"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp4",
    name: "Patanjali Ayurveda Hospital",
    address: "Patanjali Yogpeeth Phase-I, Haridwar, Uttarakhand",
    distance: "6.8 km",
    rating: 4.5,
    specialties: ["Panchakarma", "Kayachikitsa", "Rasayana", "Yoga Therapy"],
    bedsAvailable: 12,
    contactNumber: "01334-240808",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Ayushman Bharat", "Star Health Ayurveda Plans"],
    medicalSystems: ["Ayurveda", "Yoga & Naturopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp5",
    name: "Dr. Batra's Homeopathy Clinic",
    address: "F-12, East of Kailash, New Delhi",
    distance: "4.3 km",
    rating: 4.2,
    specialties: ["Skin Care", "Hair Treatment", "Allergy Management", "Chronic Diseases"],
    bedsAvailable: 0,
    contactNumber: "011-47777777",
    imageSrc: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Limited Insurance Coverage"],
    medicalSystems: ["Homeopathy"],
    isAyushmanBharatEmpanelled: false
  },
  {
    id: "hosp6",
    name: "Manipal Hospitals",
    address: "98 HAL Old Airport Road, Bengaluru",
    distance: "4.5 km",
    rating: 4.6,
    specialties: ["Cardiac Sciences", "Neurosciences", "Oncology", "Transplant"],
    bedsAvailable: 18,
    contactNumber: "080-25023344",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["HDFC ERGO", "Star Health", "Bajaj Allianz"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp7",
    name: "Medanta - The Medicity",
    address: "Sector 38, Gurugram, Haryana",
    distance: "6.2 km",
    rating: 4.7,
    specialties: ["Cardiac Surgery", "Liver Transplant", "Robotic Surgery", "Cancer Care"],
    bedsAvailable: 22,
    contactNumber: "0124-4141414",
    imageSrc: "https://images.unsplash.com/photo-1578991624414-c47aef483f89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Max Bupa", "ICICI Lombard", "Care Health"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp8",
    name: "Christian Medical College",
    address: "Vellore, Tamil Nadu",
    distance: "5.7 km",
    rating: 4.9,
    specialties: ["Nephrology", "Neurology", "Pediatrics", "Research"],
    bedsAvailable: 25,
    contactNumber: "0416-2282001",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Ayushman Bharat", "CGHS", "State Government Plans"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp9",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    address: "Oshiwara, Andheri West, Mumbai",
    distance: "4.9 km",
    rating: 4.5,
    specialties: ["Cardiac Care", "Neurosciences", "Oncology", "Transplant Medicine"],
    bedsAvailable: 16,
    contactNumber: "022-30918000",
    imageSrc: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Max Bupa", "Star Health", "HDFC ERGO"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  },
  {
    id: "hosp10",
    name: "Narayana Health City",
    address: "Bommasandra, Bengaluru",
    distance: "5.5 km",
    rating: 4.6,
    specialties: ["Cardiac Sciences", "Oncology", "Neurosciences", "Orthopedics"],
    bedsAvailable: 20,
    contactNumber: "080-71878787",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    insuranceAccepted: ["Ayushman Bharat", "Star Health", "ICICI Lombard"],
    medicalSystems: ["Allopathy"],
    isAyushmanBharatEmpanelled: true
  }
];

const HospitalFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedMedicalSystem, setSelectedMedicalSystem] = useState<string | null>(null);
  const [filterAyushman, setFilterAyushman] = useState<boolean>(false);
  
  const allSpecialties = Array.from(
    new Set(hospitals.flatMap((hospital) => hospital.specialties))
  ).sort();

  const allMedicalSystems = Array.from(
    new Set(hospitals.flatMap((hospital) => hospital.medicalSystems))
  ).sort();
  
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      hospital.address
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
      
    const matchesSpecialty =
      selectedSpecialty === null ||
      hospital.specialties.includes(selectedSpecialty);
      
    const matchesMedicalSystem =
      selectedMedicalSystem === null ||
      hospital.medicalSystems.includes(selectedMedicalSystem);
      
    const matchesAyushman = 
      !filterAyushman || hospital.isAyushmanBharatEmpanelled;
      
    return matchesSearch && matchesSpecialty && matchesMedicalSystem && matchesAyushman;
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookBed = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleBookBedSubmit = () => {
    // Basic validation
    if (!patientName || !contactNumber || !insuranceProvider) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate booking process (replace with actual backend call)
    try {
      // Placeholder for actual booking logic
      const bookingDetails = {
        hospitalName: selectedHospital?.name,
        patientName,
        contactNumber,
        insuranceProvider,
      };

      // Here you would typically make an API call to book the bed
      console.log('Booking details:', bookingDetails);

      // Set booking confirmation
      setBookingConfirmed(true);
      
      // Optional: Close dialog after successful booking
      setIsDialogOpen(false);

      // Show success toast
      toast.success(`Bed booked successfully at ${selectedHospital?.name}`);

      // Reset form
      setPatientName('');
      setContactNumber('');
      setInsuranceProvider('');
    } catch (error) {
      toast.error('Failed to book bed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="flex items-center text-medical-darkblue">
          <Building className="mr-2 h-5 w-5" />
          Hospital Finder
        </CardTitle>
        <CardDescription>
          Find and book beds at hospitals near you in India
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search hospitals or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="sm:w-48">
            <Select value={selectedMedicalSystem || ""} onValueChange={(val) => setSelectedMedicalSystem(val || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Medical System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                {allMedicalSystems.map((system) => (
                  <SelectItem key={system} value={system}>{system}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer space-x-2">
              <input 
                type="checkbox" 
                checked={filterAyushman}
                onChange={() => setFilterAyushman(!filterAyushman)}
                className="rounded border-gray-300 text-medical-blue focus:ring-medical-blue h-4 w-4"
              />
              <span className="text-sm font-medium">Ayushman Bharat Only</span>
            </label>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allSpecialties.map((specialty) => (
            <Badge
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedSpecialty === specialty
                  ? "bg-medical-blue"
                  : "hover:bg-medical-lightblue hover:bg-opacity-20"
              }`}
              onClick={() =>
                setSelectedSpecialty(
                  selectedSpecialty === specialty ? null : specialty
                )
              }
            >
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="border rounded-lg overflow-hidden card-hover"
            >
              <div className="sm:flex">
                <div className="sm:w-1/3 h-40 sm:h-auto overflow-hidden">
                  <img
                    src={hospital.imageSrc}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      {hospital.isAyushmanBharatEmpanelled && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-1">
                          <Shield className="h-3 w-3 mr-1" /> Ayushman Bharat
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star className="fill-amber-500 h-4 w-4 mr-1" />
                      {hospital.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {hospital.address} ({hospital.distance})
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Phone className="h-3.5 w-3.5 mr-1" />
                    {hospital.contactNumber}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Leaf className="h-3.5 w-3.5 mr-1" />
                    {hospital.medicalSystems.join(", ")}
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-gray-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-2 text-xs">
                    <span className="font-medium">Insurance:</span>{" "}
                    <span className="text-gray-600">{hospital.insuranceAccepted.join(", ")}</span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">Beds Available: </span>
                      <span className={`font-semibold ${
                        hospital.bedsAvailable > 0 
                          ? "text-medical-green" 
                          : "text-medical-red"
                      }`}>
                        {hospital.bedsAvailable}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => handleBookBed(hospital)}
                      disabled={hospital.bedsAvailable === 0}
                      className="bg-medical-blue hover:bg-medical-darkblue"
                    >
                      Book Bed
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredHospitals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No hospitals found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Bed at {selectedHospital?.name}</DialogTitle>
            <DialogDescription>
              Please fill in the following details to book a bed at {selectedHospital?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient Name
              </Label>
              <Input 
                id="patientName"
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                placeholder="Enter patient name" 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactNumber" className="text-right">
                Contact Number
              </Label>
              <Input 
                id="contactNumber"
                type="tel" 
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
                placeholder="Enter contact number" 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="insuranceProvider" className="text-right">
                Insurance Provider
              </Label>
              <Select 
                value={insuranceProvider} 
                onValueChange={(val) => setInsuranceProvider(val)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Insurance Provider" />
                </SelectTrigger>
                <SelectContent>
                  {selectedHospital?.insuranceAccepted.map((provider) => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookBedSubmit} 
              className="bg-medical-blue hover:bg-medical-darkblue text-white"
              disabled={!patientName || !contactNumber || !insuranceProvider}
            >
              Submit Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default HospitalFinder;
