export const slots = {
    'slot1': '10 AM - 12 PM',
    'slot2': '12 PM - 02 PM',
    'slot3': '04 PM - 06 PM',
    'slot4': '06 PM - 08 PM'
}

export const doctors = {
    'chetan': 'Dr.  Chetan Shetter',
    'deepak': 'Dr.  Deepak Shetter'
}

const day = new Date();
export const today = day.toISOString().split('T')[0]

day.setDate(day.getDate() + 1);
export const tomorrow = day.toISOString().split('T')[0]