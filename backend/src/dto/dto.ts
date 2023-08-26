// Latest cat appointment at 11:00 Am
// No cat grooming on saturdays
// Latest dog appointment at 15:00 Pm, no lunch time
interface Grooming {
    SmallAnimalGrooming: 60;
    BigAnimalGrooming: 90;
    CatGrooming: 180;
}

// type Specialities = "Echography" | "X-rays" | "Acupuncture";

// No controls on saturdays
// Test labs between 9:00 Am and 10:30 Am, last appointment being at 10:15 Am
// Controls and consults starting at 10:30 Am
type Services = Grooming | 'Consult' | 'Test labs' | 'Control' | 'Speciality';

interface Appointments {
    type: Services;
    // No sundays or holidays
    // 9:00 Am - 17:00 Pm
    date: string;
    // Lunch time: 2:00 Pm - 3:00 Pm
    hour: string;
}
