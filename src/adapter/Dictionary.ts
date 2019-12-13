/**
 * Dictionary.ts
 * created by Jacob on 2017-06-20
 */

namespace adapter {

export interface StringDictionary<T> {
    [key: string]: T;
}

export interface NumberDictionary<T> {
    [key: number]: T;
}

}