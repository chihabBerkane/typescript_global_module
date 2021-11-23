/**
 * Determines if the type of a given value is primitive
 */
export function isPrimitive(val: any): boolean {

    if(val === undefined) {
        throw new Error('error: undefined parameter');
    }

    if(val === null) {
        return true;
    }
      
    if (typeof val == "object" || typeof val == "function") {
      return false;
    }

    return true;
}


/**
 * Tests equality of content between two litteral objects
 */
function shallowEquals<T>(element1: T, element2: T): boolean {
    let equals = true;

    const keys1 = Object.keys(element1);
    const keys2 = Object.keys(element2);

    if(keys1.length !== keys2.length) {
        equals = false;  
    }

    for (let key of keys1) {
        if(element1[key] !== element2[key]) equals = false;
    }


    return equals;
}


/**
 * Tests equality between two given variables
 * See `shallowEquals()`
 */
export function equals<T>(element1: T, element2: T): boolean {

    let equals: boolean;
    if( isPrimitive(element1) && isPrimitive(element2) ) {
        equals = (element1 === element2); 
    } else {
        equals = shallowEquals(element1, element2);
    }

    return equals;
}


/**
 * Converts an array into a litteral object
 */
export function convertToObject<T>(array: T[], ...keys: string[]): { [key:string] :T} {
    
    const object = {};

    for (let i = 0; i < array.length; i++) {
        const element: T = array[i];
        let key: string;

        if( isPrimitive(element) ) {
            key = `${i}`;
        }

        if(!isPrimitive(element)) {

            const objectKeys: string[] = []
            for (const k of keys) {

                if( !element.hasOwnProperty(k)) {
                    throw Error(`error : object does not contain key "${k}"`);
                }
                objectKeys.push(element[k]);
            }

            key = objectKeys.join('-');
        }

        if (!object[key]) {
            object[key] = element;
        }
    }

    return object;
}


/**
 * Removes duplicate values in a given array
 */
export function removeDuplicates<T>(array: T[]): T[] {

    const res = {};
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const key = isPrimitive(element) ? element.toString() : JSON.stringify(element);
        if( !res[key]) {
            res[key] = element;
        }
    }

    return Object.values(res);
}

