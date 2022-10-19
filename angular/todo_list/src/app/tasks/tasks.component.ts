import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:any;
  error:any;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.fetchTask();

}

fetchTask():void{
  this.http.get( 'http://localhost:8080/api/list/' )
  .subscribe(

      (response) => this.tasks = response,
      (error) => this.error = error
    )
}

reload():void{
  this.fetchTask()
}
createRecord(inputText:any){
  var params = {text: inputText.value}

  this.http.post( 'http://localhost:8080/api/list/', params )
  .subscribe(response=>{
    this.reload()
   console.log("record saved")
  })
}
}
