/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

 export interface ISearch {}

 export class MSearch implements ISearch{
   _id: string;
   name: string;

   constructor(name: string) {
     this.name = name;
   }
 }

 export interface ISearchState extends Array<MSearch>{}
 export const intitialState:ISearchState = []
