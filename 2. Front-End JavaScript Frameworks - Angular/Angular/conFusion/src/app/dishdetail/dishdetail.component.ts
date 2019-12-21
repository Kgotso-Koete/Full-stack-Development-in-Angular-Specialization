// by Kgotso Koete

import { Component, OnInit, ViewChild, Input, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { switchMap } from "rxjs/operators";
import { Comment } from "../shared/comment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { visibility } from "../animations/app.animation";
import { flyInOut, expand } from "../animations/app.animation";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;"
  },
  animations: [flyInOut(), visibility(), expand()]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  dishcopy: Dish;
  prev: string;
  next: string;
  errMess: string;

  // for comment form data
  feedbackForm: FormGroup;
  feedback: Comment;
  @ViewChild("fform") feedbackFormDirective;
  visibility = "shown";

  formErrors = {
    author: "",
    comment: ""
  };

  validationMessages = {
    author: {
      required: "Name is required.",
      minlength: "Name must be at least 2 characters long."
    },
    comment: {
      required: "Comment is required."
    }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject("BaseURL") private baseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(
      dishIds => (this.dishIds = dishIds),
      errmess => (this.errMess = <any>errmess)
    );
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = "hidden";
          return this.dishservice.getDish(+params["id"]);
        })
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = "shown";
        },
        errmess => (this.errMess = <any>errmess)
      );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      author: ["", [Validators.required, Validators.minLength(2)]],
      comment: ["", [Validators.required]],
      rating: 5
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    // save date when comment is made
    var d = new Date();
    var n = d.toISOString();
    this.feedback.date = n;
    console.log(this.feedback);
    // add new comment to dish comments temporarily
    this.dishcopy.comments.push(this.feedback);
    this.dishservice.putDish(this.dishcopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      errmess => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      }
    );

    // reset the form
    this.feedbackForm.reset({
      rating: 5,
      comment: "",
      author: "",
      date: ""
    });
    this.feedbackFormDirective.resetForm();
  }
}
