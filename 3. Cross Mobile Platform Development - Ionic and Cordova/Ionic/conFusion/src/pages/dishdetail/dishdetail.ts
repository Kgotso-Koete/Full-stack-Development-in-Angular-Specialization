// By Kgotso Koete

import { Component, Inject } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController,
  ModalController
} from "ionic-angular";
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import { FavoriteProvider } from "../../providers/favorite/favorite";
import { CommentPage } from "../../pages/comment/comment";
import { SocialSharing } from "@ionic-native/social-sharing";

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-dishdetail",
  templateUrl: "dishdetail.html"
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject("BaseURL") private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    public actionCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing
  ) {
    this.dish = navParams.get("dish");
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => (total += comment.rating));
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  addToFavorites() {
    console.log("Adding to Favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl
      .create({
        message: "Dish " + this.dish.id + " added as favorite successfully",
        position: "middle",
        duration: 3000
      })
      .present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DishdetailPage");
  }

  async presentActionSheet() {
    let actionSheet = this.actionCtrl.create({
      title: "Select Actions",
      buttons: [
        {
          text: "Add to Favorites",
          icon: "heart",
          handler: () => {
            let toast = this.toastCtrl
              .create({
                message:
                  "Dish " + this.dish.id + " added as a favorite successfully",
                duration: 3000
              })
              .present();

            this.favoriteservice.addFavorite(this.dish.id);
          }
        },
        {
          text: "Add a Comment",
          icon: "text",
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage);
            modal.present();
            modal.onDidDismiss(data => {
              console.log(data);
              this.dish.comments.push(data);

              let toast = this.toastCtrl
                .create({
                  message: "Your comment was added successfully",
                  duration: 3000
                })
                .present();
            });
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Share via Facebook",
          handler: () => {
            this.socialSharing
              .shareViaFacebook(
                this.dish.name + " -- " + this.dish.description,
                this.BaseURL + this.dish.image,
                ""
              )
              .then(() => console.log("Posted successfully to Facebook"))
              .catch(() => console.log("Failed to post to Facebook"));
          }
        },
        {
          text: "Share via Twitter",
          handler: () => {
            this.socialSharing
              .shareViaTwitter(
                this.dish.name + " -- " + this.dish.description,
                this.BaseURL + this.dish.image,
                ""
              )
              .then(() => console.log("Posted successfully to Twitter"))
              .catch(() => console.log("Failed to post to Twitter"));
          }
        }
      ]
    });

    await actionSheet.present();
  }
}
