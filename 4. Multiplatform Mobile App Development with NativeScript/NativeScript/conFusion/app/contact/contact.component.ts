import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-contactus",
  moduleId: module.id,
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  constructor(@Inject("baseURL") private baseURL) {}

  ngOnInit() {}
}
