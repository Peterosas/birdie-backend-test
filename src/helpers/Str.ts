const pluralize = require('pluralize');

/**
 * Author: Peter Erhunmuwnse
 * Description: A small string utility library
 * Date Created: 29/08/2021
 */

class Str {
    static snake(str: string): string {
        return str.split(/(?=[A-Z])/).join('_').toLowerCase();
    }
    static pluralStudly(str: string): string {
        return pluralize(str); //Should be replaced to later, just depending an external package
    }
}

export {Str};