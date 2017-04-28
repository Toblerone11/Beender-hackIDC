// {"id":"2","name":"Ron2","email":null,"picture":null,"tl":null}
export class User {    
  constructor(
    public id:number,
    public name:string,
    public email:string,
    public picture:string,    
    public timelines:any   
  ){}
}