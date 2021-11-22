/**
 * Determines if the type of a given value is primitive or not
 */
export function isPrimitive(val: any): boolean {

    if( val === null ) {
        // throw error ?
        return true;
    }
      
    if (typeof val == "object" || typeof val == "function") {
      return false;
    }
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
 * If variables are litteral objects `shallowEquals()`
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
                    throw Error(`Current object does not contain key "${k}"`);
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


export function removeDuplicates<T>(array: T[]): T[] {

    const result = [...array];
    for (let i = 0; i < result.length; i++) {
        const element = result[i];

        for (let j = 0; j < result.length; j++) {
            const compared = result[j];
            if(equals(element, compared) && i !== j) {
                result.splice(j,1)
            }
        }
    }

        
    return result;
}
