import { v4 as uuidv4 } from 'uuid';
function getUUID() {
    // Generate a UUID
    const uuid = uuidv4();

    // Take a substring of the UUID and convert it to a number
    const randomSixDigit = parseInt(uuid.replace(/[^0-9]/g, '').slice(0, 6), 10);

    // If the number is less than 6 digits, recursively call the function until it's 6 digits
    if (randomSixDigit < 100000) {
        return getUUID();
    }

    return randomSixDigit;
}

export default getUUID;
