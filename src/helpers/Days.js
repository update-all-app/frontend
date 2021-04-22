import { capitalize } from './functions'

class Day{ 

    constructor(name, number){
        this.name = name
        this.number = number
    }

    get value(){
        return this.name
    }

    get displayValue(){
        return capitalize(this.name)
    }
}

export class DAYS{

    static SUNDAY = new Day('sunday', 0)
    static MONDAY = new Day('monday', 1)
    static TUESDAY = new Day('tuesday', 2)
    static WEDNEADAY = new Day('wednesday', 3)
    static THURSDAY = new Day('thursday', 4)
    static FRIDAY = new Day('friday', 5)
    static SATURDAY = new Day('saturday', 6)

    static get ALL(){
        return this.dayLookupFromNumber
    }

    static dayLookupFromString = {
        monday: this.MONDAY,
        tuesday: this.TUESDAY,
        wednesday: this.WEDNEADAY,
        thursday: this.THURSDAY,
        friday: this.FRIDAY,
        saturday: this.SATURDAY,
        sunday: this.SUNDAY
    }

    static dayLookupFromNumber = [
        this.SUNDAY,
        this.MONDAY,
        this.TUESDAY,
        this.WEDNEADAY,
        this.THURSDAY,
        this.FRIDAY,
        this.SATURDAY
    ]

    static GET(val){
        const num = Number.parseInt(val)
        
        if(Number.isNaN(num)){
            return this.dayLookupFromString[val.toLowerCase()]
        }else{
            return this.dayLookupFromNumber[num]
        }
    }
}
