// By Kgotso Koete

import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-comment",
  templateUrl: "comment.html"
})
export class CommentPage {
  addedComment: Comment;
  newComment: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.newComment = this.formBuilder.group({
      author: ["", Validators.required],
      rating: 5,
      comment: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.addedComment = this.newComment.value;
    var d = new Date();
    var n = d.toISOString();
    this.addedComment.date = n;
    // console.log(this.addedComment);
    this.viewCtrl.dismiss(this.addedComment);
  }
}
