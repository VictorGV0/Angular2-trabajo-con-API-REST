import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-each-task',
  templateUrl: './each-task.component.html',
  styleUrls: ['./each-task.component.css']
})
export class EachTaskComponent implements OnInit {

  @Input()

  taskInfo: any;

  @Output()
  taskChange : EventEmitter<number> = new EventEmitter;
  showRecords: boolean;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  deleteRecord(taskInfo:any):void{
    this.http.delete('http://localhost:8080/api/list/' + taskInfo._id)
    .subscribe((response) =>{
      this.taskChange.emit()
    })
  }
  enableEdit():void{
    this.showRecords = true

  }

  editRecord(taskInfo:any, editText:any){
    var params = {
      text: editText.value
    }

    this.http.put('http://localhost:8080/api/list/' + taskInfo._id, params)
    .subscribe( response =>{
      this.taskChange.emit()
    })
  }

}
