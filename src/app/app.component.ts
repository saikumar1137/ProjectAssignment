import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form:FormGroup;
  enable:boolean=false;
  users: any;
  
  state:any;
  namevalue:any;
  title = 'projectAssignment';
  flag: boolean =false;
  
  constructor(private fb: FormBuilder,private http: HttpClient){
    this.form = this.fb.group({
      Name:['',Validators.required],
      City:['',Validators.required],
     
    })
  }
 
  getresult(){
    this.http.get("https://api.openbrewerydb.org/breweries?by_city="+this.form.value.City).subscribe(res=>{
      this.users = res;
      this.state=this.users[2]['state'];
    })

    this.http.get("https://api.openbrewerydb.org/breweries?by_name="+this.form.value.Name).subscribe(res=>{
      this.users = res;
      this.namevalue=this.users.length;
    })
    this.flag=true;

    setTimeout(()=>{
    this.form.reset();
    this.flag=false;

    }, 8000)
  }
}
